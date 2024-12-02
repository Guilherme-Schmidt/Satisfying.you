import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0u6fyNdbnebMOBScPIEZjaC7j2G2RcHE",
  authDomain: "testemobile-cc6f2.firebaseapp.com",
  projectId: "testemobile-cc6f2",
  storageBucket: "testemobile-cc6f2.firebasestorage.app",
  messagingSenderId: "479687631173",
  appId: "1:479687631173:web:50acaa59ad4a6799e19e2c"
};


const app = initializeApp(firebaseConfig);

const auth_module = getAuth(app);

export {auth_module}