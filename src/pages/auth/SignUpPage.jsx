
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const HammerCashLogo = () => (
  <div className="flex items-center justify-center mb-6">
    <img src="/hammercash_logo.png" alt="HammerCash Logo" className="h-10 w-10 mr-2" />
    <span className="text-2xl font-bold text-gray-800">HammerCash</span>
  </div>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
    <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4"/>
    <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.7 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853"/>
    <path d="M119.3 324.3c-11.4-33.8-11.4-71.4 0-105.2v-70.1H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04"/>
    <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 342.1-4.4 272.1 0 169.2 0 75.1 58 28.9 149.9l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.3z" fill="#ea4335"/>
  </svg>
);

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
    </svg>
);

const countries = ['Canada', 'United States', 'Mexico', 'United Kingdom', 'Australia'];

export default function SignUpPage() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'Canada',
    marketingOptIn: false,
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  const handleGoogleSignIn = async () => {
    if (!formData.agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
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
          country: formData.country,
          marketingOptIn: formData.marketingOptIn,
          createdAt: new Date(),
        });
      }

      navigate('/dashboard');
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        marketingOptIn: formData.marketingOptIn,
        createdAt: new Date(),
      });

      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError("Failed to create an account. Please try again.");
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
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-orange-500">🔨 HammerCash</h1>
      </div>
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Start getting paid upfront.</h1>

      <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 disabled:opacity-50" style={{ background: 'white', border: '1px solid #dadce0', color: '#3c4043', fontWeight: '500' }}>
        <GoogleIcon />
        <span className="font-semibold">Continue with Google</span>
      </button>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div className="flex gap-4">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
        <div className="relative">
          <input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
          <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
            {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <select name="country" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg">
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" name="marketingOptIn" onChange={handleChange} className="mt-1" />
            <span>Send me helpful emails to set up and get paid.</span>
          </label>
          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" name="agreedToTerms" onChange={handleChange} className="mt-1" />
            <span>Yes, I understand and agree to the HammerCash <Link to="/terms" className="underline">Terms of Service</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-[#F97316] text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition duration-300 disabled:opacity-50">
          Sign up with Email
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[#F97316] hover:underline">Log In</Link>
      </p>
      </div>    </div>
  );
}
