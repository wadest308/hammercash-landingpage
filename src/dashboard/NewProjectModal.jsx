import { useState, useMemo } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

export default function NewProjectModal({ isOpen, onClose, onRefresh }) {
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Separate state for the raw autocomplete value and the processed location data
  const [place, setPlace] = useState(null);
  const [location, setLocation] = useState({ address: null, lat: null, lng: null });

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  const handlePlaceSelect = async (newPlace) => {
    setPlace(newPlace);
    if (newPlace && newPlace.label) {
      try {
        const results = await geocodeByAddress(newPlace.label);
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ address: newPlace.label, lat, lng });
      } catch (error) {
        console.error('Geocoding Error:', error);
        setLocation({ address: newPlace.label, lat: null, lng: null });
      }
    } else {
      setLocation({ address: null, lat: null, lng: null });
    }
  };

  const streetViewUrl = useMemo(() => {
    if (location.lat && location.lng) {
      return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${location.lat},${location.lng}&key=${apiKey}`;
    }
    return null;
  }, [location, apiKey]);

  const handleClearAddress = () => {
    setPlace(null);
    setLocation({ address: null, lat: null, lng: null });
  };

  const handleSubmit = async () => {
    setError('');
    if (!projectName.trim()) { setError('Project name is required.'); return; }
    setLoading(true);

    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error('You must be logged in.');

      await addDoc(collection(db, 'jobs'), {
        uid: user.uid,
        contractorEmail: user.email,
        projectName: projectName.trim(),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        totalAmount: parseFloat(totalAmount),
        description: description.trim(),
        status: 'in_progress', // Default status
        createdAt: serverTimestamp(),
        address: location.address,
        lat: location.lat,
        lng: location.lng,
      });

      // Reset form
      setProjectName('');
      setCustomerName('');
      setCustomerEmail('');
      setTotalAmount('');
      setDescription('');
      handleClearAddress();
      setLoading(false);

      if (onRefresh) onRefresh();
      if (onClose) onClose();

    } catch (err) {
      console.error('Firestore error:', err);
      setError('Failed to create project: ' + err.message);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg md:max-w-lg max-h-[90vh] overflow-y-auto w-[90vw]">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Existing form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="text-sm text-gray-500 mb-1 block">Project Name *</label><input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="text-sm text-gray-500 mb-1 block">Total Amount *</label><input type="number" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="text-sm text-gray-500 mb-1 block">Customer Name *</label><input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
            <div><label className="text-sm text-gray-500 mb-1 block">Customer Email *</label><input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm"/></div>
        </div>
        <div className="mb-4"><label className="text-sm text-gray-500 mb-1 block">Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>

        {/* Address Field */}
        <div className="mb-4">
            <label className="text-sm text-gray-500 mb-1 block">Property Address</label>
            <GooglePlacesAutocomplete
                apiKey={apiKey}
                selectProps={{
                    value: place,
                    onChange: handlePlaceSelect,
                    placeholder: "Start typing the house address...",
                    styles: {
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    },
                }}
             />
        </div>

        {streetViewUrl && (
            <div className="mb-4 relative">
                <p className="text-sm text-gray-500 mb-1">Property Preview:</p>
                <img src={streetViewUrl} alt="Property Preview" className="rounded-lg w-full border border-gray-200" />
                <button onClick={handleClearAddress} className="absolute top-8 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                   <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50">{loading ? 'Creating...' : 'Create Project'}</button>
        </div>

      </div>
    </div>
  );
}