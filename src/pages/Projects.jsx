import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import StatusBadge from '../components/StatusBadge';

const StreetViewThumbnail = ({ address }) => {
  const url = `https://maps.googleapis.com/maps/api/streetview?size=80x55&location=${encodeURIComponent(address)}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;
  return <img src={url} alt="Street View" className="w-20 h-[55px] object-cover rounded-md" />;
};

export default function Projects() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
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
    }, (err) => {
      console.error('Projects fetch error:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const handleDelete = async (e, projectId, projectUid) => {
    e.stopPropagation(); // Prevent row navigation
    const user = auth.currentUser;
    if (projectUid !== user.uid) {
        alert("You are not authorized to delete this project.");
        return;
    }

    if (window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
        try {
            const batch = writeBatch(db);
            const projectRef = doc(db, "jobs", projectId);
            batch.delete(projectRef);
            const milestonesQuery = query(collection(db, "milestones"), where("jobId", "==", projectId));
            const milestoneSnapshot = await getDocs(milestonesQuery);
            milestoneSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project. Please try again.");
        }
    }
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => (j.status || 'in_progress') === filter);
  const formatCurrency = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading projects...</div>;

  return (
    <div className="p-8">
        {/* Firestore Migration Note: Old projects without lat/lng will show the fallback icon. */}
        {/* To fix, contractors should edit the project and re-save the address to generate coordinates. */}
        {/* ... header ... */}
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-semibold">Projects</h2>
                <p className="text-gray-400 text-sm">{jobs.length} total project{jobs.length !== 1 ? 's' : ''}</p>
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)} className="text-sm border rounded-lg px-3 py-2">
                <option>All</option>
                <option value="in_progress">Active Work</option>
                <option value="awaiting_payment">Awaiting Payment</option>
                <option value="funded">Funded</option>
                <option value="awaiting_approval">Awaiting Approval</option>
                <option value="completed">Completed</option>
            </select>
        </div>

      {filteredJobs.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center"><p className="text-gray-400 text-sm">No projects found.</p></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.map(job => (
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
                  <p className="text-base"><span className="font-semibold">Customer:</span> {job.customerName}</p>
                </div>                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-orange-500">{formatCurrency(job.totalAmount)}</p>
                  <div className="flex items-center space-x-4">
                    <StatusBadge status={job.status || 'in_progress'} />
                    <button onClick={(e) => handleDelete(e, job.id, job.uid)} className="border border-red-500 text-red-500 hover:bg-red-50 text-xs font-bold py-1 px-3 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}