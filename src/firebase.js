import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export const googleProvider = new GoogleAuthProvider();
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
apiKey: "AIzaSyBJ4MpMwGegxn7uNI1YhWcLqiIMIosnHOI",
authDomain: "hammercash-89f4d.firebaseapp.com",
projectId: "hammercash-89f4d",
storageBucket: "hammercash-89f4d.firebasestorage.app",
messagingSenderId: "940212674558",
appId: "1:940212674558:web:98760eeed690dfba2faaaf",
measurementId: "G-7S7LXVMJ83"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
