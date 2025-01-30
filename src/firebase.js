import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIka_ZCoHM1VEaQMVJhfEYEqm4FJztc6k",
  authDomain: "myreactauth-64b2e.firebaseapp.com",
  projectId: "myreactauth-64b2e",
  storageBucket: "myreactauth-64b2e.appspot.com",
  messagingSenderId: "58374876781",
  appId: "1:58374876781:web:cae8c1fcaf47c2c9849964",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber };
