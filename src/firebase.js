import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAu2HEbWcHXSSnMj-qY8KezaeGWEI25onY",
    authDomain: "whatsapp-clone-4cce2.firebaseapp.com",
    projectId: "whatsapp-clone-4cce2",
    storageBucket: "whatsapp-clone-4cce2.appspot.com",
    messagingSenderId: "879541772140",
    appId: "1:879541772140:web:0cf8cb60dbb2f6b31edd49",
    measurementId: "G-T1VQN9Z6G1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(app);
const db = getFirestore(app)

export { auth, googleProvider, db }