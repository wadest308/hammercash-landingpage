import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

// Always render the img tag, using the address.


const formatStatus = (status) => {
  const map = {
    'in_progress': 'In Progress',
    'submitted': 'Submitted',
    'completed': 'Completed',
    'paid': 'Paid',
    'released': 'Released',
  };
  return map[status.toLowerCase()] || status || 'In Progress';
};

export default function DashboardHome() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleShare = (projectId) => {
    const link = `${window.location.origin}/pay/${projectId}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        setLoading(false);
        return;
    };

    const q = query(collection(db, 'jobs'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const jobList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobList);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fmt = (n) => (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
  const activeJobs = jobs.filter(j => j.status !== 'paid' && j.status !== 'released');

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading dashboard...</div>;

  return (
    <div className="p-8">
      {/* Other page elements omitted for brevity */}
      <div className="border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold">Active Projects</h3>
        </div>
        {activeJobs.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-sm">No active projects.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {activeJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={() => navigate(`/dashboard/projects/${job.id}`)}>
                {job.imageUrl ? (
                  <img src={job.imageUrl} style={{ height: '140px', objectFit: 'cover', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }} alt="Property" className="w-full" />
                ) : (
                  <div style={{ height: '140px', backgroundColor: '#e0e0e0' }}></div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg">{job.projectName}</h3>
                  <p className="text-sm text-gray-500">{job.address}</p>
                  <div className="mt-4">
                    <p className="text-sm"><span className="font-semibold">Customer:</span> {job.customerName}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-bold text-orange-500">${fmt(job.totalAmount)}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600`}>
                      {formatStatus(job.status)}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-gray-200">
                  <button onClick={() => handleShare(job.id)} className="w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Share Payment Link</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
