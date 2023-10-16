// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/database";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNrzlZonjT3JIo5znaf5gNKyNVqgJ_sNw",
  authDomain: "netflixgpt-c322c.firebaseapp.com",
  projectId: "netflixgpt-c322c",
  storageBucket: "netflixgpt-c322c.appspot.com",
  messagingSenderId: "542015280835",
  appId: "1:542015280835:web:8d005cf5ec1713e0473476",
  measurementId: "G-DY8DBJHE4Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
const database = firebase.database();
const auth = getAuth();
export {firebase, auth, database};