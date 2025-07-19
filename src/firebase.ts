// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyAqnCQkZRb7l2fZVvAWGye0Pj60eR3Gz8E",
  authDomain: "sports-gear-app.firebaseapp.com",
  projectId: "sports-gear-app",
  storageBucket: "sports-gear-app.firebasestorage.app",
  messagingSenderId: "160606530271",
  appId: "1:160606530271:web:e0d92d1c9b26c5996a576a",
  measurementId: "G-0XSNWWPL9J"
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Set up Auth and Provider with types
const auth: Auth = getAuth(app);
const provider: GoogleAuthProvider = new GoogleAuthProvider();

export { auth, provider };
