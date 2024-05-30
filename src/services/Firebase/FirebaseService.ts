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
    apiKey: "AIzaSyChxUoqZZtdZTpN5F8Fg9yO8l_2K2vdmL0",
    authDomain: "lawt-a9eab.firebaseapp.com",
    projectId: "lawt-a9eab",
    storageBucket: "lawt-a9eab.appspot.com",
    messagingSenderId: "259318949322",
    appId: "1:259318949322:web:7b202337df585bc3f51b33"
};

export const EMAIL_COND_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const USERS_TYPS = {
    ADM: {value: 'Administrador', code: 'ADM'}, 
    CLI: {value: 'Cliente', code: 'CLI'}, 
    ABO: {value: 'Abogado', code: 'ABO'}, 
    ALL: {value: 'Publico', code: 'ALL'}
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);