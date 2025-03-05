// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your Firebase config (use your own credentials from the Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyBME7z7mJwR3VwW3HZs6ejhjZtZ2LylBWg",
    authDomain: "at-system-db.firebaseapp.com",
    projectId: "at-system-db",
    storageBucket: "at-system-db.firebasestorage.app",
    messagingSenderId: "753060041421",
    appId: "1:753060041421:web:3f3e0f833e43d5f97bcf84",
    measurementId: "G-10CT1L3HKG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Export Firestore and Auth
export { db, auth };