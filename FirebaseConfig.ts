import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFzqgPWDmHPdHgzn3i0uuPJrETmp3-3SY",
  authDomain: "toviai.firebaseapp.com",
  projectId: "toviai",
  storageBucket: "toviai.firebasestorage.app",
  messagingSenderId: "628131989828",
  appId: "1:628131989828:web:974b215d678ec175e42f11",
  measurementId: "G-ZGQ368BWG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);