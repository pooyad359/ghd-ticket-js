import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDUMaluKvB1XkI3MD5xe7heRKLS-sTXoo8",
    authDomain: "ghd-tracking.firebaseapp.com",
    projectId: "ghd-tracking",
    storageBucket: "ghd-tracking.firebasestorage.app",
    messagingSenderId: "578872645852",
    appId: "1:578872645852:web:5c6dac4ca625526adffc19",
    measurementId: "G-SJFL92SSMJ"
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);