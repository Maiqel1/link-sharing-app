import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBCfTWPqpZTdXY-ZoQXHOxrgQp9zfbEY0g",
    authDomain: "link-app-95c39.firebaseapp.com",
    projectId: "link-app-95c39",
    storageBucket: "link-app-95c39.appspot.com",
    messagingSenderId: "517522200401",
    appId: "1:517522200401:web:5a38beb5da75e36c15a570"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
