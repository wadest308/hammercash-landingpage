import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

export default function NewProjectModal({ isOpen, onClose, onRefresh }) {
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const autocompleteInput = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && scriptLoaded && autocompleteInput.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInput.current,
        { types: ['address'] }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const addr = place.formatted_address;
        setAddress(addr);
        const url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(addr)}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;
        setPreviewUrl(url);
      });
    }
  }, [isOpen, scriptLoaded]);

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
        address: address,
        imageUrl: previewUrl,
      });

      // Reset form
      setProjectName('');
      setCustomerName('');
      setCustomerEmail('');
      setTotalAmount('');
      setDescription('');
      setAddress('');
      setPreviewUrl('');
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
            <input
              ref={autocompleteInput}
              type="text"
              placeholder="Enter property address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
        </div>

        {previewUrl && (
          <div className="mb-4">
            <img src={previewUrl} crossOrigin="anonymous" alt="Street View Preview" />
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