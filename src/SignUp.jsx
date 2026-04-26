import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [country, setCountry] = useState('United States');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [error, setError] = useState('');

  const returnTo = new URLSearchParams(location.search).get('returnTo') || '/dashboard';

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        navigate(returnTo);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignUp = (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate(returnTo);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-bold text-orange-500">🔨 HammerCash</h1>
        </div>
          <h1 className="text-2xl font-bold">Start getting paid upfront.</h1>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center mb-4 border border-gray-200"
          style={{ background: 'white', border: '1px solid #dadce0', color: '#3c4043', fontWeight: '500' }}
        >
          <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google logo" className="h-6 mr-4" />
          Continue with Google
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-neutral-200" />
          <span className="px-2 text-neutral-400">or</span>
          <hr className="flex-grow border-neutral-200" />
        </div>

        <form onSubmit={handleEmailSignUp}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-lg p-3 w-full"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-lg p-3 w-full"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-lg p-3 w-full mb-4"
          />
          <div className="relative mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-lg p-3 w-full"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-neutral-400"
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-gray-100 border border-gray-200 rounded-lg p-3 w-full mb-4"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>

          <div className="space-y-4 mb-6">
            <label className="flex items-center text-sm text-neutral-400">
              <input
                type="checkbox"
                checked={receiveEmails}
                onChange={(e) => setReceiveEmails(e.target.checked)}
                className="mr-2"
              />
              Send me emails with tips on how to find talent that's right for me.
            </label>
            <label className="flex items-center text-sm text-neutral-400">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mr-2"
              />
              Yes, I understand and agree to the HammerCash Terms of Service, including the User Agreement and Privacy Policy.
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full"
          >
            Sign up with Email
          </button>
        </form>

        <p className="text-center mt-8">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
