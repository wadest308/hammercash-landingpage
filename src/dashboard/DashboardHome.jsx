import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import { sendMilestoneReleasedNotification } from '../utils/notifications';

export default function DashboardHome() {
  const [jobs, setJobs] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  const handleHomeownerApprove = async (milestone) => {
    try {
      const milestoneRef = doc(db, 'milestones', milestone.id);
      const updates = {
        homeownerApproved: true,
        homeownerApprovedAt: serverTimestamp(),
      };
  
      if (milestone.contractorApproved) {
        updates.status = 'Released';
        updates.releasedAt = serverTimestamp();
  
        await sendMilestoneReleasedNotification({
          toEmail: milestone.homeownerEmail,
          toName: 'Homeowner',
          projectName: milestone.projectName,
          milestoneTitle: milestone.title,
          milestoneAmount: milestone.amount,
        });
  
        await sendMilestoneReleasedNotification({
          toEmail: milestone.contractorEmail,
          toName: 'Contractor',
          projectName: milestone.projectName,
          milestoneTitle: milestone.title,
          milestoneAmount: milestone.amount,
        });
  
        alert('Milestone approved and released! Both parties notified by email.');
      } else {
        updates.status = 'Awaiting Contractor';
        alert('Your approval recorded. Waiting for contractor confirmation.');
      }
  
      await updateDoc(milestoneRef, updates);
      window.location.reload();
    } catch (err) {
      console.error('Approve error:', err);
      alert('Something went wrong: ' + err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getAuth().currentUser;
        if (!user) return;

        const userSnap = await getDoc(doc(db, 'users', user.uid));
        const role = userSnap.data()?.role || 'contractor';
        setUserRole(role);

        if (role === 'homeowner') {
          const mq = query(
            collection(db, 'milestones'),
            where('homeownerEmail', '==', user.email)
          );
          const mSnap = await getDocs(mq);
          const milestoneList = mSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setMilestones(milestoneList);
        } else {
          const q = query(collection(db, 'jobs'), where('uid', '==', user.uid));
          const snapshot = await getDocs(q);
          const jobList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setJobs(jobList);
        }

      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalValue = jobs.reduce((sum, j) => sum + (j.totalAmount || 0), 0);
  const activeJobs = jobs.filter(j => j.status !== 'paid').length;
  const heldInEscrow = jobs
    .filter(j => j.status === 'In Progress' || j.status === 'Submitted')
    .reduce((sum, j) => sum + (j.totalAmount || 0), 0);
  const readyForPayout = jobs
    .filter(j => j.status === 'Completed')
    .reduce((sum, j) => sum + (j.totalAmount || 0), 0);

  const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });

  if (loading) return (
    <div className="p-8 text-gray-400 text-sm">Loading dashboard...</div>
  );

  return (
    <div className="p-8">
      {userRole === 'homeowner' ? (
        <div className="border border-gray-200 rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold">Milestones Awaiting Your Approval</h3>
          </div>
          {milestones.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">
              No milestones pending your approval yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-200">
                  <th className="px-6 py-3">Milestone</th>
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map(m => (
                  <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{m.title}</td>
                    <td className="px-6 py-4 text-gray-500">{m.projectName}</td>
                    <td className="px-6 py-4 font-medium">
                      ${(m.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        m.status === 'Released' ? 'bg-green-100 text-green-700' :
                        m.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {m.status === 'Submitted' && !m.homeownerApproved && (
                        <button
                          onClick={() => handleHomeownerApprove(m)}
                          className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700"
                        >
                          Approve Release
                        </button>
                      )}
                      {m.status === 'Released' && (
                        <span className="text-green-600 text-xs font-medium">✓ Released</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <p className="text-gray-400 text-sm">
                Managing {activeJobs} active project{activeJobs !== 1 ? 's' : ''}
              </p>
            </div>
            <button className="border border-gray-300 text-sm px-4 py-2 rounded-lg hover:bg-gray-50">
              Export Report
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-0 border border-gray-200 rounded-lg mb-8">
            <div className="p-6 border-r border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Value</p>
              <p className="text-2xl font-bold">{fmt(totalValue)}</p>
              <p className="text-green-500 text-xs mt-1">↑ Active projects</p>
            </div>
            <div className="p-6 border-r border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Held in Escrow</p>
              <p className="text-2xl font-bold">{fmt(heldInEscrow)}</p>
              <p className="text-gray-400 text-xs mt-1">
                {jobs.filter(j => j.status === 'In Progress').length} pending
              </p>
            </div>
            <div className="p-6 border-r border-gray-200 border-l-4 border-l-orange-500">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Ready for Payout</p>
              <p className="text-2xl font-bold">{fmt(readyForPayout)}</p>
              {readyForPayout > 0 && (
                <p className="text-orange-500 text-xs mt-1">⏱ Awaiting your approval</p>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Active Jobs</p>
              <p className="text-2xl font-bold">{activeJobs}</p>
              <p className="text-gray-400 text-xs mt-1">Total projects</p>
            </div>
          </div>

          {/* Projects Table */}
          <div className="border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold">Active Projects</h3>
              <select className="text-sm border border-gray-200 rounded px-3 py-1 text-gray-500">
                <option>All Status</option>
                <option>In Progress</option>
                <option>Submitted</option>
                <option>Completed</option>
              </select>
            </div>

            {jobs.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                No active projects yet. Click <span className="text-orange-500 font-medium">New Project</span> to get started.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3">Project Name</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Total Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium">{job.projectName}</p>
                        <p className="text-gray-400 text-xs">ID: #HC-{job.id.slice(0,4).toUpperCase()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{job.customerName}</p>
                        <p className="text-gray-400 text-xs">{job.customerEmail}</p>
                      </td>
                      <td className="px-6 py-4 font-medium">{fmt(job.totalAmount || 0)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          job.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {job.status || 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
