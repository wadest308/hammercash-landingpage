
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const HammerCashLogo = () => (
  <div className="flex items-center justify-center mb-6">
    <img src="/hammercash_logo.png" alt="HammerCash Logo" className="h-10 w-10 mr-2" />
    <span className="text-2xl font-bold text-gray-800">HammerCash</span>
  </div>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg"><path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/><path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.7 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/><path d="M119.3 324.3c-11.4-33.8-11.4-71.4 0-105.2v-70.1H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/><path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 342.1-4.4 272.1 0 169.2 0 75.1 58 28.9 149.9l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.3z" fill="#ea4335"/></svg>
);

const AppleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.6234 14.6473C19.6364 14.644 19.6493 14.6407 19.6623 14.6374C19.6753 14.6341 19.6883 14.6309 19.7012 14.6276C20.4802 13.535 20.8711 12.2612 20.8711 10.9329C20.8711 8.48086 19.1023 6.55934 16.9242 6.55934C15.8281 6.55934 14.9332 7.02712 14.2383 7.64384C13.5133 7.03961 12.593 6.55934 11.5133 6.55934C9.33516 6.55934 7.625 8.48086 7.625 10.9329C7.625 12.2938 8.04648 13.5677 8.86484 14.6341L8.8793 14.654C8.88125 14.6565 8.88328 14.6592 8.88539 14.6619C8.8875 14.6644 8.88953 14.6669 8.89164 14.6694C8.89375 14.6719 8.89578 14.6744 8.89781 14.6768C8.90016 14.6795 8.90234 14.6823 8.90469 14.685C9.79492 15.8936 10.1504 17.6548 10.0566 19.213C10.6387 19.2485 11.3508 19.3292 12.0016 19.3292C12.6371 19.3292 13.2039 19.261 13.7914 19.2282C13.882 17.6163 14.2254 15.8829 15.1156 14.6768C15.1176 14.6744 15.1196 14.6719 15.1217 14.6694C15.1238 14.6669 15.1258 14.6644 15.1279 14.6619C15.13 14.6592 15.1321 14.6565 15.134 14.654L15.1484 14.6341C15.1789 14.5919 15.2078 14.5501 15.2355 14.509C15.2676 14.4604 15.298 14.4118 15.3262 14.3629C15.3539 14.3142 15.3789 14.2652 15.4023 14.2155C15.4246 14.166 15.4453 14.1162 15.4641 14.0664C15.4828 14.0166 15.5 13.9668 15.5152 13.917C15.5301 13.8672 15.543 13.8174 15.5539 13.7679C15.5641 13.7185 15.5723 13.6691 15.5781 13.6198C15.5836 13.5709 15.5867 13.5219 15.5879 13.4728C15.5887 13.4479 15.5891 13.423 15.5891 13.3981C15.5891 13.3956 15.5891 13.3932 15.5891 13.3907C15.5891 13.3633 15.5867 13.3359 15.5844 13.3086C14.7734 10.5181 15.4375 7.95361 16.909 6.57184C16.9148 6.56684 16.9199 6.56234 16.9242 6.55934C15.1023 5.03434 12.8098 4.62809 11.0766 4.62809C10.0535 4.62809 8.88906 4.88842 7.95156 5.37342C8.16992 5.09334 8.52812 4.09334 8.52812 3.36834C8.52812 2.05271 9.4793 1.34021 10.4543 1.34021C11.3656 1.34021 12.3559 1.94771 13.2309 1.94771C14.1059 1.94771 15.1551 1.25857 16.0926 1.25857C17.7699 1.25857 19.043 2.45779 19.043 4.13514C19.043 5.3867 18.2043 6.58162 17.4332 7.23475C18.2324 7.63123 19.1008 8.41162 19.1008 9.54412C19.1008 9.94803 19.018 10.3297 18.8684 10.6726C18.4965 10.7578 18.084 10.4578 17.9293 10.0539C17.5145 8.92147 16.273 8.35897 15.2855 8.35897C14.7824 8.35897 14.2004 8.51366 13.7887 8.78905C13.7348 8.8242 13.6844 8.86327 13.6375 8.90545C13.018 9.40506 12.6309 10.1582 12.6309 11.0332C12.6309 12.6451 14.1809 13.5201 14.8293 13.8877C14.1504 14.2889 13.5684 14.5492 13.0652 14.7047C12.016 15.016 11.1195 15.2631 10.4543 15.6551C10.2832 15.7539 10.123 15.8645 9.97695 15.9879C9.67383 16.2422 9.4168 16.5317 9.21328 16.8528C8.75039 17.5876 8.52812 18.5251 8.52812 19.3418C8.52812 19.3907 8.52852 19.4398 8.5293 19.4886C8.53008 19.5379 8.53125 19.5869 8.5332 19.6356C9.21328 21.0048 10.5133 22.6598 12.0016 22.6598C13.4922 22.6598 14.8043 21.0173 15.4844 19.6485C15.4855 19.6462 15.4867 19.6439 15.4879 19.6418C15.4887 19.6393 15.4895 19.6369 15.4902 19.6345C15.491 19.632 15.4918 19.6295 15.4926 19.6271C15.4938 19.6245 15.4953 19.6219 15.4965 19.6193C15.5684 19.4673 15.6262 19.3103 15.6695 19.1509C15.7363 18.9056 15.7738 18.6474 15.7738 18.3918C15.7738 17.8293 15.6832 17.2218 15.5258 16.6668C15.3402 15.9927 14.9332 15.4962 14.5422 15.1962C15.5301 14.6064 16.4867 13.9103 16.9242 13.0134C17.6535 13.4357 18.5133 13.8877 19.6234 14.6473Z"/></svg>
);

const PersonIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostLogin = async (user) => {
    const userSnap = await getDoc(doc(db, 'users', user.uid));
    
    if (!userSnap.exists() || !userSnap.data().role) {
      navigate('/select-role');
    } else {
      navigate('/dashboard');
    }
  };




  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }

      handlePostLogin(user);
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleAppleSignIn = () => {
    setError('Apple Sign-In is not yet implemented.');
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handlePostLogin(userCredential.user);
    } catch (err) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError("Login failed. Please try again.");
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md" style={{borderRadius: '12px'}}>
        <HammerCashLogo />
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign in to find work you love</h1>

        <form onSubmit={handleContinue}>
          <div className="relative mb-4">
             {/* Email Input */}
          </div>
          {/* TODO: Add password input */}

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          
          <button
            type="submit"
            className="w-full bg-[#22A045] text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300 disabled:opacity-50"
            style={{borderRadius: '8px'}}
            disabled={loading}
          >
            Continue
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-4 text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <div className="space-y-4">
          <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50" style={{borderRadius: '8px'}}>
            <GoogleIcon />
            <span className="font-semibold text-gray-700">Continue with Google</span>
          </button>
          <button onClick={handleAppleSignIn} disabled={loading} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50" style={{borderRadius: '8px'}}>
            <AppleIcon />
            <span className="font-semibold text-gray-700">Continue with Apple</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have a HammerCash account?{' '}
          <Link to="/signup" className="font-semibold text-[#22A045] underline hover:text-opacity-80">Sign Up</Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-10">
          By continuing, you agree to our Terms of Service and acknowledge you've read our Privacy Policy.
        </p>
      </div>
    </div>
  );
}
