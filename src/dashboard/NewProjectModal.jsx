import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

export default function NewProjectModal({ isOpen, onClose, onRefresh }) {
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('In Progress');
  const [milestones, setMilestones] = useState([
    { name: '', amount: '', dueDate: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', amount: '', dueDate: '' }]);
  };

  const updateMilestone = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmit = async () => {
    setError('');

    if (!projectName.trim()) { setError('Project name is required.'); return; }
    if (!customerName.trim()) { setError('Customer name is required.'); return; }
    if (!customerEmail.trim()) { setError('Customer email is required.'); return; }
    if (!totalAmount || isNaN(totalAmount)) { setError('Valid total amount is required.'); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) { setError('Please enter a valid email address.'); return; }

    setLoading(true);

    try {
      const user = getAuth().currentUser;

      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      const jobRef = await addDoc(collection(db, 'jobs'), {
        uid: user.uid,
        contractorEmail: user.email,
        projectName: projectName.trim(),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        totalAmount: parseFloat(totalAmount),
        description: description.trim(),
        status,
        createdAt: serverTimestamp(),
      });

      for (const m of milestones) {
        if (m.name.trim()) {
          await addDoc(collection(db, 'milestones'), {
            uid: user.uid,
            jobId: jobRef.id,
            contractorEmail: user.email,
            homeownerEmail: customerEmail.trim(),
            projectName: projectName.trim(),
            title: m.name.trim(),
            amount: parseFloat(m.amount) || 0,
            dueDate: m.dueDate || null,
            status: 'In Progress',
            progress: 0,
            contractorApproved: false,
            homeownerApproved: false,
            createdAt: serverTimestamp(),
          });
        }
      }

      // Reset form
      setProjectName('');
      setCustomerName('');
      setCustomerEmail('');
      setTotalAmount('');
      setDescription('');
      setStatus('In Progress');
      setMilestones([{ name: '', amount: '', dueDate: '' }]);
      setLoading(false);

      if (onRefresh) onRefresh();
      if (onClose) onClose();

    } catch (err) {
      console.error('Firestore error:', err);
      setError('Failed to create project: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Project Name *</label>
            <input
              type="text"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              placeholder="e.g. Kitchen Renovation"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Total Amount *</label>
            <input
              type="number"
              value={totalAmount}
              onChange={e => setTotalAmount(e.target.value)}
              placeholder="10000"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="John Smith"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Customer Email *</label>
            <input
              type="email"
              value={customerEmail}
              onChange={e => setCustomerEmail(e.target.value)}
              placeholder="customer@email.com"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500 mb-1 block">Description (optional)</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Project details..."
            rows={3}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-500 mb-1 block">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option>In Progress</option>
            <option>Submitted</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Milestones */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Milestones</h3>
          {milestones.map((m, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Milestone name"
                value={m.name}
                onChange={e => updateMilestone(i, 'name', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="number"
                placeholder="Amount"
                value={m.amount}
                onChange={e => updateMilestone(i, 'amount', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="date"
                value={m.dueDate}
                onChange={e => updateMilestone(i, 'dueDate', e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}
          <button
            onClick={addMilestone}
            className="text-orange-500 text-sm font-medium hover:text-orange-600 mt-1"
          >
            + Add Milestone
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>

      </div>
    </div>
  );
}