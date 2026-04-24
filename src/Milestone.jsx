import React, { useState, useEffect, useMemo } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';

const MediumProjectCard = ({ project }) => {
  const { projectName, address, lat, lng, customerName, totalAmount, status } = project || {};
  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

  const streetViewUrl = useMemo(() => {
    if (lat && lng) {
      return `https://maps.googleapis.com/maps/api/streetview?size=260x160&location=${lat},${lng}&key=${apiKey}`;
    }
    return null;
  }, [lat, lng, apiKey]);

  if (!project) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex mb-6">
        <div className="w-1/3 flex-shrink-0">
            <img src={`https://maps.googleapis.com/maps/api/streetview?size=260x160&location=${encodeURIComponent(project.address)}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`} alt={`Street view of ${address}`} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex-grow">
            <h2 className="text-lg font-bold text-gray-800">{projectName}</h2>
            <p className="text-xs text-gray-500 mt-1">{address}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-semibold text-orange-600">Client:</span><span className="ml-2 text-gray-700">{customerName}</span></div>
                <div><span className="font-semibold text-gray-600">Value:</span><span className="ml-2 text-gray-700">${(totalAmount || 0).toLocaleString()}</span></div>
                 <div><span className="font-semibold text-gray-600">Status:</span><span className="ml-2 text-gray-700">{status}</span></div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Payment Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Project Value</span>
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

export default function Milestone() {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;
        const q = query(collection(db, 'jobs'), where('uid', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const userProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(userProjects);
            if (userProjects.length > 0 && !selectedProjectId) {
                setSelectedProjectId(userProjects[0].id);
            }
            setLoading(false); // Initial load is done
        }, err => {
            console.error("Error fetching projects:", err);
            setError("Could not load projects.");
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user, selectedProjectId]);

    useEffect(() => {
        if (!selectedProjectId || !user) {
            setMilestones([]);
            return;
        };
        
        const q = query(collection(db, 'milestones'), where('jobId', '==', selectedProjectId), where('uid', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMilestones(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, err => {
            console.error("Error fetching milestones:", err);
            setError("Could not load milestones for this project.");
        });

        return () => unsubscribe();
    }, [selectedProjectId, user]);

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Milestones</h1>
                <select 
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    disabled={projects.length === 0}
                >
                    {projects.length === 0 && <option>No projects found</option>}
                    {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
                </select>
            </div>

            {selectedProject && 
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MediumProjectCard project={selectedProject} />
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading...</div>
                        ) : error ? (
                            <div className="p-8 text-center text-red-500">{error}</div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {milestones.length > 0 ? milestones.map(m => (
                                            <tr key={m.id}>
                                                <td className="p-4 text-sm font-medium text-gray-900">{m.title}</td>
                                                <td className="p-4 text-sm text-gray-600">{m.status}</td>
                                                <td className="p-4 text-sm text-gray-600">${(m.amount || 0).toLocaleString()}</td>
                                                <td className="p-4 text-sm text-gray-600">{m.dueDate}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" className="text-center py-16 text-gray-500">No milestones for this project.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <PaymentSummaryCard project={selectedProject} />
                    </div>
                </div>
            }

        </div>
    );
}
