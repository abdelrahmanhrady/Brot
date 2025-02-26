import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbYvtgfPIHFwuGOY6DaY-AGYP6Cj5nrwk",
  authDomain: "brrot-bfb9f.firebaseapp.com",
  projectId: "brrot-bfb9f",
  storageBucket: "brrot-bfb9f.firebasestorage.app",
  messagingSenderId: "639304699519",
  appId: "1:639304699519:web:5830a8f93c1345ea08394a",
  measurementId: "G-36ZKCSSQMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };