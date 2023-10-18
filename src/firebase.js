// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `"AIzaSyAm6tXaiikbPNMV-CFUAr0TxbWbXZWYpv0"`,
  authDomain: "carwashmajorproject.firebaseapp.com",
  projectId: "carwashmajorproject",
  storageBucket: "carwashmajorproject.appspot.com",
  messagingSenderId: "606965000934",
  appId: "1:606965000934:web:050b06ee8d99c94e3a2927"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
