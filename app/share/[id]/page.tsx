"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Preview from '@/app/preview/page';
import { UserData } from '@/app/types';

export default function SharedLinks() {
  const params = useParams();
  const id = params?.id as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedData = async () => {
      if (id) {
        try {
          const shareableDoc = await getDoc(doc(db, 'shareableLinks', id));
          if (shareableDoc.exists()) {
            const { userId } = shareableDoc.data();
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
              const data = userDoc.data() as UserData;
              setUserData(data);
            }
          }
        } catch (error) {
          console.error("Error fetching shared data: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSharedData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Shared link not found or expired.</div>;
  }

  return <Preview links={userData.links} profile={userData.profile} isSharedView={true} />;
}