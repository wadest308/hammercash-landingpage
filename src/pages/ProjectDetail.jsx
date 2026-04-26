import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, collection, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import StatusBadge from '../components/StatusBadge';

const ProjectHeroCard = ({ project }) => {
    const { projectName, address, customerName, customerEmail, totalAmount, status, createdAt } = project || {};
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(address)}&key=${apiKey}`;

    const formatDate = (ts) => ts ? new Date(ts.seconds * 1000).toLocaleDateString() : 'N/A';

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex">
            <div className="w-1/3 flex-shrink-0">
                <img src={streetViewUrl} alt={`Street view of ${address}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-800">{projectName}</h2>
                <p className="text-sm text-gray-500 mt-1">{address}</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold text-orange-600">Customer:</span><span className="ml-2 text-gray-700">{customerName}</span></div>
                    <div><span className="font-semibold text-gray-600">Email:</span><span className="ml-2 text-gray-700">{customerEmail}</span></div>
                    <div><span className="font-semibold text-gray-600">Value:</span><span className="ml-2 text-gray-700">${(totalAmount || 0).toLocaleString()}</span></div>
                    <div><span className="font-semibold text-gray-600">Status:</span><StatusBadge status={status} /></div>
                    <div><span className="font-semibold text-gray-600">Created:</span><span className="ml-2 text-gray-700">{formatDate(createdAt)}</span></div>
                </div>
            </div>
        </div>
    );
};

const PaymentSummaryCard = ({ project }) => {
  const total = project.totalAmount || 0;
  // These are placeholders, as the data is not available in the project object yet
  const funded = 0;
  const released = 0;
  const remaining = total - released;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Contract</span>
          <span className="text-sm font-semibold text-gray-900">${total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Funded</span>
          <span className="text-sm font-semibold text-green-600">${funded.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Released</span>
          <span className="text-sm font-semibold text-gray-900">${released.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
          <span className="text-sm font-semibold text-gray-900">Remaining</span>
          <span className="text-sm font-bold text-gray-900">${remaining.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={() => window.alert("Payment request feature coming soon. Your contractor will be contacted.")}
          className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Request Funding
        </button>
      </div>
    </div>
  );
};


export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState({ title: '', amount: '', dueDate: '' });


  const auth = getAuth();
  const user = auth.currentUser;

  const handleAddMilestone = async () => {
    if (!milestoneForm.title || !milestoneForm.amount || !milestoneForm.dueDate) {
        alert('All fields are required.');
        return;
    }
    await addDoc(collection(db, 'milestones'), {
      title: milestoneForm.title,
      amount: Number(milestoneForm.amount),
      dueDate: milestoneForm.dueDate,
      status: 'awaiting_payment',
      projectId: id,
      userId: user.uid,
      createdAt: new Date()
    });
    setShowAddMilestone(false);
    setMilestoneForm({ title: '', amount: '', dueDate: '' });
  };

  const handleMarkComplete = async (milestoneId, amount) => {
    try {
      const res = await fetch('/api/stripe/release-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: project.paymentIntentId, // assuming this is stored in the project document
          amount: amount * 100, // convert to cents
        }),
      });
      const data = await res.json();
      if (data.success) {
        const milestoneRef = doc(db, 'milestones', milestoneId);
        await updateDoc(milestoneRef, {
          status: 'awaiting_approval'
        });
        // For now, we will just log the email content to the console
        console.log(`Email sent to homeowner: Please approve the milestone at ${window.location.origin}/approve/${milestoneId}`);
      }
    } catch (err) {
      console.error('Stripe release payment error:', err);
    }
  };

  useEffect(() => {
    if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
    }

    const projectRef = doc(db, 'jobs', id);
    const unsubscribeProject = onSnapshot(projectRef, (docSnap) => {
        if (docSnap.exists() && docSnap.data().uid === user.uid) {
            setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
            setError("Project not found or access denied.");
        }
        setLoading(false);
    }, (err) => {
        console.error(err);
        setError("Failed to load project.");
        setLoading(false);
    });

    const milestonesQuery = query(collection(db, 'milestones'), where('projectId', '==', id), where('userId', '==', user.uid));
    const unsubscribeMilestones = onSnapshot(milestonesQuery, (snapshot) => {
        setMilestones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
        unsubscribeProject();
        unsubscribeMilestones();
    };
  }, [id, user]);

  if (loading) return <div className="p-8 text-center">Loading project...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
        {showAddMilestone && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
                    <h2 className="text-xl font-bold mb-4">Add Milestone</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Title" value={milestoneForm.title} onChange={e => setMilestoneForm({...milestoneForm, title: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                        <input type="number" placeholder="Amount" value={milestoneForm.amount} onChange={e => setMilestoneForm({...milestoneForm, amount: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                        <input type="date" placeholder="Due Date" value={milestoneForm.dueDate} onChange={e => setMilestoneForm({...milestoneForm, dueDate: e.target.value})} className="w-full border rounded-lg px-3 py-2 text-sm" />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => setShowAddMilestone(false)} className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                        <button onClick={handleAddMilestone} className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">Submit</button>
                    </div>
                </div>
            </div>
        )}

      <div className="mb-6">
        <button onClick={() => navigate('/dashboard/projects')} className="text-sm text-gray-600 hover:text-black">
          &larr; Back to Projects
        </button>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                {project && <ProjectHeroCard project={project} />}
            </div>
            <div className="lg:col-span-1">
                {project && <PaymentSummaryCard project={project} />}
            </div>
        </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Milestones</h3>
            <button onClick={() => setShowAddMilestone(true)} className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Add Milestone
            </button>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
           <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase bg-gray-50 border-b">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {milestones.length > 0 ? milestones.map(m => (
                <tr key={m.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">{m.title}</td>
                  <td className="px-6 py-4">{(m.status || '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</td>
                  <td className="px-6 py-4">${(m.amount || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">{m.dueDate}</td>
                  <td className="px-6 py-4">
                    {m.status === 'in_progress' && (
                        <button onClick={() => handleMarkComplete(m.id, m.amount)} className="text-indigo-600 hover:text-indigo-900">Mark Complete</button>
                    )}
                    {m.status === 'awaiting_approval' && (
                        <span className="text-green-600">✅ Awaiting Approval</span>
                    )}
                    {m.status === 'approved' && (
                        <span className="text-green-600">✅ Approved — Payout Pending</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center p-8 text-gray-400">No milestones for this project yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
