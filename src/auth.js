import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // This will trigger the onAuthStateChanged listener in MainPage.jsx
    // which will then handle the redirect to /dashboard
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};
