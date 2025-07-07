// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDthcjt96FQoGJJY6ORNErKJCXO5kC-pI",
    authDomain: "luxwatch-2025.firebaseapp.com",
    projectId: "luxwatch-2025",
    storageBucket: "luxwatch-2025.firebasestorage.app",
    messagingSenderId: "385870903994",
    appId: "1:385870903994:web:fc74598d4215814aa46083",
    measurementId: "G-WEKSJ411T5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const db = getFirestore(app); // Needed for Firestore

const analytics = getAnalytics(app);