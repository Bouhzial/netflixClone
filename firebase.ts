// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAt3ld44VVZ6sQXqQTCGhsfDgJFWf8WxUU",
    authDomain: "netflix-clone-e52f7.firebaseapp.com",
    projectId: "netflix-clone-e52f7",
    storageBucket: "netflix-clone-e52f7.appspot.com",
    messagingSenderId: "1095104639757",
    appId: "1:1095104639757:web:7cadf84eb5e126e7d5b644"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }