// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChzQBKUmhDJn1zRCbBWmCHLFElcGwi6Jg",
  authDomain: "bmw-car-v1.firebaseapp.com",
  projectId: "bmw-car-v1",
  storageBucket: "bmw-car-v1.appspot.com",
  messagingSenderId: "982638039509",
  appId: "1:982638039509:web:2425b96f4d60b37a2ead5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;