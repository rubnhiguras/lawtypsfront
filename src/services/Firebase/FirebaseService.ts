import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// CONST SHOULD BE EMPTY IN REPO !!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const firebaseConfig = {
    apiKey: "AIzaSyCBkRl-wRWaN-E0VKdC3Mtgn0DYwihsl38",
    authDomain: "lawtyps.firebaseapp.com",
    projectId: "lawtyps",
    storageBucket: "lawtyps.appspot.com",
    messagingSenderId: "585598118619",
    appId: "1:585598118619:web:50ad7aac93cd89bc3abafe",
    measurementId: "G-L0JNS9MHCG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);