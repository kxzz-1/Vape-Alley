// c:\Users\G L B\Documents\VS code\Web\Vape-Alley\Vape-Alley\src\firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX-IlB7u9Gu43I_PMr7227qU2oaiLPJdQ",
  authDomain: "vape-alley.firebaseapp.com",
  projectId: "vape-alley",
  storageBucket: "vape-alley.appspot.com",
  messagingSenderId: "258986422358",
  appId: "1:258986422358:web:7ced19243fdc8a0a018bf7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
