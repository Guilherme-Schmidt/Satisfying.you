import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {FIREBASE_API_KEY} from '@env';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'testemobile-cc6f2.firebaseapp.com',
  projectId: 'testemobile-cc6f2',
  storageBucket: 'testemobile-cc6f2.firebasestorage.app',
  messagingSenderId: '479687631173',
  appId: '1:479687631173:web:50acaa59ad4a6799e19e2c',
};


const app = initializeApp(firebaseConfig);
const auth_module = getAuth(app);
const db = getFirestore(app);

export {app, auth_module, db};
