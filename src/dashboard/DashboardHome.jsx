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

  const fmt = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
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
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b">
                <th className="px-6 py-3 w-24"></th>
                <th className="px-6 py-3">Project Details</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeJobs.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-2">
                    <img src={job.imageUrl} crossOrigin="anonymous" alt="Property" className="w-20 h-[55px] object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{job.projectName}</p>
                    <p className="text-gray-500 text-xs mt-1">{job.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{job.customerName}</p>
                    <p className="text-gray-400 text-xs">{job.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{fmt(job.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600`}>
                      {formatStatus(job.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
