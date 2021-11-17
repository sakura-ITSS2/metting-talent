import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAzcbZqcZfJZ3pbw1Kyt1LKTQl8FlU_orA",
  authDomain: "itss2-25e16.firebaseapp.com",
  projectId: "itss2-25e16",
  storageBucket: "itss2-25e16.appspot.com",
  messagingSenderId: "362540819931",
  appId: "1:362540819931:web:ea88cd98501b0c337073fe",
  measurementId: "G-NMMY9M15XM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);