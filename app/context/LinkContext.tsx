"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { nanoid } from 'nanoid';
import { Link, Profile, UserData, LinkContextProps } from '../types';

const LinkContext = createContext<LinkContextProps | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile>({ firstName: '', lastName: '', email: '', profilePicture: '' });
  const [user, setUser] = useState<any>(null);
  const [fullname, setFullname] = useState()
  const [shareableLink, setShareableLink] = useState<string | null>(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        setLinks([]);
        setProfile({ firstName: '', lastName: '', email: '', profilePicture: '' });
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setLinks(userData.links || []);
        setProfile(userData.profile || { firstName: '', lastName: '', email: '', profilePicture: '' });
      } else {
        console.log("No user document found");
  console.log(profile);

      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  console.log(profile);
  

  const addLink = async (link: Link) => {
    const newLinks = [...links, link];
    setLinks(newLinks);
    
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userDocRef);
        if (docSnapshot.exists()) {
          await updateDoc(userDocRef, { links: newLinks });
        } else {
          await setDoc(userDocRef, { links: newLinks });
        }
      } catch (error) {
        console.error("Error adding link: ", error);
      }
    }
  };
  

  const removeLink = async (id: string) => {
    const newLinks = links.filter(link => link.id !== id);
    setLinks(newLinks);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { links: newLinks });
      } catch (error) {
        console.error("Error removing link: ", error);
      }
    }
  };

  const generateShareableLink = async (): Promise<string> => {
    if (user) {
      const linkId = nanoid(10);
      const shareableLink = `${window.location.origin}/share/${linkId}`;
      
      try {
        await setDoc(doc(db, 'shareableLinks', linkId), {
          userId: user.uid,
          createdAt: new Date()
        });
        
        setShareableLink(shareableLink);
        return shareableLink;
      } catch (error) {
        console.error("Error generating shareable link: ", error);
        throw error;
      }
    }
    throw new Error("User not authenticated");
  };

  const updateLink = async (updatedLink: Link) => {
    const newLinks = links.map(link => (link.platform === updatedLink.platform ? updatedLink : link));
    setLinks(newLinks);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { links: newLinks });
      } catch (error) {
        console.error("Error updating link: ", error);
      }
    }
  };  

  const setProfileData = async (profile: Profile) => {
    setProfile(profile);
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), { profile });
      } catch (error) {
        console.error("Error setting profile data: ", error);
      }
    }
  };

const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      links: [],
      profile: {
        firstName: '',
        lastName: '',
        email: email,
        profilePicture: ''
      }
    });
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <LinkContext.Provider value={{ links, profile, addLink, removeLink, updateLink, shareableLink,
      generateShareableLink, setProfile: setProfileData, user, signUp, signIn, signOutUser }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error('useLinkContext must be used within a LinkProvider');
  }
  return context;
};
