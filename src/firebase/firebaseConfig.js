// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDNJ9Wm4IwPPVmDRc9iAqoGjDcNHI0Odjw',
  authDomain: 'red-social-new-wave.firebaseapp.com',
  projectId: 'red-social-new-wave',
  storageBucket: 'red-social-new-wave.appspot.com',
  messagingSenderId: '83626664750',
  appId: '1:83626664750:web:25b5ea6f1ea43b5ba290bf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);

export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
