
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase';
import { sendMilestoneApprovalRequest, sendMilestoneReleasedNotification } from './utils/notifications';

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending: 'bg-gray-100 text-gray-600',
        in_progress: 'bg-blue-100 text-blue-700',
        submitted: 'bg-yellow-100 text-yellow-700',
        released: 'bg-green-100 text-green-700',
    };
    const statusText = {
        pending: 'Pending',
        in_progress: 'In Progress',
        submitted: 'Awaiting Approval',
        released: 'Released',
    };
    return <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status] || statusStyles.pending}`}>{statusText[status] || status}</span>;
};

export default function Milestone() {
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState('contractor'); // Assume contractor default, adjust as needed

    const auth = getAuth();
    const user = auth.currentUser;

    const fetchMilestones = async () => {
        if (!user) {
            setLoading(false);
            return;
        }
        
        setLoading(true);
        try {
            // A real app would determine if user is homeowner or contractor for a project
            // For now, we query milestones where the user is either the contractor OR the homeowner
            const contractorQuery = query(collection(db, 'milestones'), where('uid', '==', user.uid));
            const homeownerQuery = query(collection(db, 'milestones'), where('homeownerEmail', '==', user.email));

            const [contractorSnapshot, homeownerSnapshot] = await Promise.all([getDocs(contractorQuery), getDocs(homeownerQuery)]);
            
            const contractorMilestones = contractorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), role: 'contractor' }));
            const homeownerMilestones = homeownerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), role: 'homeowner' }));

            // Simple merge and de-dupe
            const allMilestones = [...contractorMilestones, ...homeownerMilestones];
            const uniqueMilestones = Array.from(new Map(allMilestones.map(item => [item.id, item])).values());

            setMilestones(uniqueMilestones);
        } catch (err) {
            console.error("Error fetching milestones:", err);
            setError("Unable to load data. Please refresh.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMilestones();
    }, [user]);

    // Called when contractor clicks "Mark Complete"
    const handleContractorApprove = async (milestone) => {
        try {
            const milestoneRef = doc(db, 'milestones', milestone.id);
            await updateDoc(milestoneRef, {
                contractorApproved: true,
                contractorApprovedAt: serverTimestamp(),
                status: 'submitted',
            });

            await sendMilestoneApprovalRequest({
                toEmail: milestone.homeownerEmail,
                toName: 'Homeowner',
                projectName: milestone.projectName || 'Your Project',
                milestoneTitle: milestone.title,
                milestoneAmount: milestone.amount,
                dueDate: milestone.dueDate,
            });
            alert('Milestone marked complete. Homeowner has been notified by email.');
            fetchMilestones(); // Refresh data
        } catch (error) {
            console.error('Error approving milestone:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    // Called when homeowner clicks "Approve Release"
    const handleHomeownerApprove = async (milestone) => {
        try {
            const milestoneRef = doc(db, 'milestones', milestone.id);
            const updatedData = {
                homeownerApproved: true,
                homeownerApprovedAt: serverTimestamp(),
                status: 'released',
                releasedAt: serverTimestamp(),
            };

            await updateDoc(milestoneRef, updatedData);

            await sendMilestoneReleasedNotification({
                toEmail: milestone.homeownerEmail,
                toName: 'Homeowner',
                projectName: milestone.projectName || 'Your Project',
                milestoneTitle: milestone.title,
                milestoneAmount: milestone.amount,
            });

            await sendMilestoneReleasedNotification({
                toEmail: milestone.contractorEmail,
                toName: 'Contractor',
                projectName: milestone.projectName || 'Your Project',
                milestoneTitle: milestone.title,
                milestoneAmount: milestone.amount,
            });

            alert('Milestone approved and released! Both parties have been notified by email.');
            fetchMilestones(); // Refresh data
        } catch (error) {
            console.error('Error approving milestone:', error);
            alert('Something went wrong. Please try again.');
        }
    };
    
    const handleRequestChanges = (milestone) => {
        // Placeholder for change request logic
        alert("Change request functionality not yet implemented.");
    }

    const renderContent = () => {
        if (loading) return <div className="p-8 text-center text-gray-500">Loading milestones...</div>;
        if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {milestones.length > 0 ? (
                            milestones.map(m => (
                                <tr key={m.id} className="hover:bg-gray-50">
                                    <td className="p-4 text-sm font-medium text-gray-900">{m.title}</td>
                                    <td className="p-4 text-sm"><StatusBadge status={m.status.toLowerCase()} /></td>
                                    <td className="p-4 text-sm text-gray-600">${(m.amount || 0).toLocaleString()}</td>
                                    <td className="p-4 text-sm text-gray-600">{m.dueDate ? new Date(m.dueDate).toLocaleDateString() : 'N/A'}</td>
                                    <td className="p-4 text-sm">
                                        {m.role === 'contractor' && m.status.toLowerCase() === 'in progress' && (
                                            <button onClick={() => handleContractorApprove(m)} className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">Mark Complete</button>
                                        )}
                                        {m.role === 'homeowner' && m.status.toLowerCase() === 'submitted' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleHomeownerApprove(m)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Approve Release</button>
                                                <button onClick={() => handleRequestChanges(m)} className="border border-gray-400 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-100">Request Changes</button>
                                            </div>
                                        )}
                                        {m.status.toLowerCase() === 'released' && <span className="text-green-600 font-semibold text-sm">✓ Released</span>}
                                        {m.status.toLowerCase() === 'submitted' && m.role === 'contractor' && <span className="text-yellow-600 text-sm">Awaiting Homeowner</span>}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center py-16 text-gray-500">No milestones found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Milestones</h1>
                </div>
                {renderContent()}
            </div>
        </div>
    );
}
