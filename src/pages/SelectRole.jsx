import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

export default function SelectRole() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSelect = async (role) => {
    const user = auth.currentUser;
    await setDoc(doc(db, 'users', user.uid), {
      role,
      email: user.email,
      displayName: user.displayName || '',
      createdAt: new Date(),
    }, { merge: true });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 max-w-lg w-full mx-4 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">How will you use HammerCash?</h1>
          <p className="text-gray-400 text-sm">Choose your role to get started</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect('contractor')}
            className="border-2 border-gray-200 rounded-xl p-6 text-left hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <div className="text-3xl mb-3">🔨</div>
            <p className="font-semibold text-lg">I'm a Contractor</p>
            <p className="text-gray-400 text-sm mt-1">Create jobs and collect payments securely</p>
          </button>
          <button
            onClick={() => handleSelect('homeowner')}
            className="border-2 border-gray-200 rounded-xl p-6 text-left hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <div className="text-3xl mb-3">🏠</div>
            <p className="font-semibold text-lg">I'm a Homeowner</p>
            <p className="text-gray-400 text-sm mt-1">Review work and approve milestone payments</p>
          </button>
        </div>
      </div>
    </div>
  );
}