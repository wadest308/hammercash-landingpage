import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/dashboard');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <style>{`
        @media (max-width: 768px) {
          .right-column-info {
            display: none;
          }
          .left-column-auth {
            width: 100%;
            justify-content: flex-start;
            padding-top: 50px;
          }
        }
      `}</style>
      {/* Left Column (Auth) */}
      <div className="left-column-auth" style={{ width: '50%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-black">H</div>
              <div>
                  <h1 className="text-xl font-black tracking-tighter text-black">HammerCash</h1>
              </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Get paid before you pick up a tool.</h2>
          <p className="text-base text-gray-500 mt-2 mb-8">Sign in to your HammerCash account.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={handleGoogleSignIn}
              style={{
                padding: '15px',
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #E5E7EB',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google logo" style={{ height: '20px' }} />
              Continue with Google
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0' }}>
            <hr style={{ flex: 1, borderColor: '#E5E7EB' }} />
            <span style={{ padding: '0 10px', color: '#A1A1AA' }}>or continue with email</span>
            <hr style={{ flex: 1, borderColor: '#E5E7EB' }} />
          </div>

          <form onSubmit={handleEmailSignIn}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: '#f3f4f6',
                color: 'black',
                border: '1px solid #E5E7EB',
                borderRadius: '5px',
                outline: 'none'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '20px',
                backgroundColor: '#f3f4f6',
                color: 'black',
                border: '1px solid #E5E7EB',
                borderRadius: '5px',
                outline: 'none'
              }}
            />
            <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: '#F97316', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              Sign In
            </button>
          </form>
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
          <p style={{ color: '#A1A1AA', fontSize: '12px', textAlign: 'center', marginTop: '30px' }}>
            By signing in you agree to our <Link to="/terms" style={{ color: '#F97316' }}>Terms of Service</Link> and <Link to="/privacy-policy" style={{ color: '#F97316' }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Right Column (Info) */}
      <div className="right-column-info" style={{ width: '50%', backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '50px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', marginBottom: '30px' }}>The fastest way to get paid as a contractor.</h2>
          <ul style={{ color: '#A1A1AA', fontSize: '18px', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}><span style={{ color: '#F97316', marginRight: '10px' }}>✓</span>Customers pay upfront through Stripe</li>
            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}><span style={{ color: '#F97316', marginRight: '10px' }}>✓</span>Get paid at every milestone automatically</li>
            <li style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: '#F97316', marginRight: '10px' }}>✓</span>No chasing invoices ever again</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
