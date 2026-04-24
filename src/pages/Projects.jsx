import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

export default function Projects() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const user = getAuth().currentUser;
        const q = query(collection(db, 'jobs'), where('uid', '==', user.uid));
        const snapshot = await getDocs(q);
        setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Projects fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(j => j.status === filter);
  const formatCurrency = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });

  if (loading) return <div className="p-8 text-gray-400 text-sm">Loading projects...</div>;

  return (
    <div className="p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-gray-400 text-sm">{jobs.length} total project{jobs.length !== 1 ? 's' : ''}</p>
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option>All</option>
          <option>In Progress</option>
          <option>Submitted</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Projects Table */}
      {filteredJobs.length === 0 ? (
        <div className="border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-sm">
            {filter === 'All' 
              ? 'No projects yet. Click New Project to create your first one.'
              : `No projects with status "${filter}".`
            }
          </p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3">Project</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4">
                    <p className="font-medium">{job.projectName}</p>
                    <p className="text-gray-400 text-xs">ID: #HC-{job.id.slice(0,6).toUpperCase()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-700">{job.customerName}</p>
                    <p className="text-gray-400 text-xs">{job.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(job.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      job.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {job.status || 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {job.createdAt?.toDate
                      ? job.createdAt.toDate().toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })
                      : '—'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}