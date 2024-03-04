// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxDuiN-IhuSs5u-38P2uUnR7A4sjaZTOI",
  authDomain: "majorprojectcarwash.firebaseapp.com",
  projectId: "majorprojectcarwash",
  storageBucket: "majorprojectcarwash.appspot.com",
  messagingSenderId: "429589755715",
  appId: "1:429589755715:web:6553aeb9fc824bf8b9a1f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
