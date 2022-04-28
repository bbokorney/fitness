import { initializeApp } from "firebase/app";
import {
  getFirestore, Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

let db: Firestore;

export default function getDB() {
  // Initialize Firebase
  console.log("firebase getDB");
  if (db == null) {
    console.log("firebase init");
    initializeApp(firebaseConfig);
    db = getFirestore();
  }
  return db;
}
