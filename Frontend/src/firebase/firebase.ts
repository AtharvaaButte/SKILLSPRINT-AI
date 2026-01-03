import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyB8zPZMwOySDKkB6faV3feaWV_UzIS0O4w",
  authDomain: "skillsprint-ai-555a0.firebaseapp.com",
  projectId: "skillsprint-ai-555a0",
  storageBucket: "skillsprint-ai-555a0.firebasestorage.app",
  messagingSenderId: "729507669634",
  appId: "1:729507669634:web:d21e4330f65e05db34b69b",
  measurementId: "G-Z4C4KN4586"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);