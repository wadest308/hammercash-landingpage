
import React from 'react';

const HammerCashIcon = () => (
  <div className="flex items-center justify-center mb-4">
    <img src="/hammercash_logo.png" alt="HammerCash Logo" className="h-12 w-12" />
  </div>
);

const PlusIcon = () => (
    <svg className="w-6 h-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>

);

const CloseIcon = () => (
    <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PlaceholderAvatar = ({ letter, color }) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 ${color}`}>
        {letter}
    </div>
);

const AccountRow = ({ letter, color, name, email }) => (
    <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
        <PlaceholderAvatar letter={letter} color={color} />
        <div>
            <p className="font-semibold text-sm text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
        </div>
    </div>

);

export default function GooglePickerModal({ onclose }) {
    // Note: This is a visual-only component to mock the native Firebase UI.

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <div className="flex justify-end">
            <button onClick={onclose} className="-mr-2 -mt-2">
                <CloseIcon />
            </button>
        </div>
        <HammerCashIcon />
        <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Choose an account</h2>
            <p className="text-gray-600 mt-1">to continue to HammerCash</p>
        </div>
        
        <div className="space-y-1">
            <AccountRow letter="A" color="bg-purple-500" name="Alex Done" email="alex.done@example.com" />
            <AccountRow letter="B" color="bg-orange-500" name="Brenda Smith" email="brenda.smith@work.com" />
        </div>

        <div className="flex items-center p-3 mt-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 border-2 border-gray-300">
                <PlusIcon />
            </div>
            <p className="font-semibold text-sm text-blue-600">Add another account</p>
        </div>

        <hr className="my-6" />

        <p className="text-xs text-gray-500 text-center leading-relaxed">
            To continue, Google will share your name, email address, and profile picture with HammerCash. See HammerCash's <a href="#" className="text-blue-600">Privacy Policy</a> and <a href="#" className="text-blue-600">Terms of Service</a>.
        </p>

        <div className="flex justify-end space-x-4 mt-6">
            <button className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">Cancel</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700" style={{backgroundColor: '#1A73E8'}}>Agree and share</button>
        </div>

      </div>
    </div>
  );
}
