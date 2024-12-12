import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJMSyPKCCmNR-qPdeGW_09MhWnmZzx9c8",
  authDomain: "crwn-clothing-db-c53b1.firebaseapp.com",
  projectId: "crwn-clothing-db-c53b1",
  storageBucket: "crwn-clothing-db-c53b1.firebasestorage.app",
  messagingSenderId: "429005848904",
  appId: "1:429005848904:web:e53abcb0b2fed20d1cb37d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userRef);

  // if userSnapshot doesn't exist, create a new user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
  return userRef;
};
