import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import StatusBadge from '../components/StatusBadge';

const PropertyCard = ({ project }) => {
    if (!project) return null;
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-2">{project.projectName}</h3>
            <p className="text-sm text-gray-600">{project.address}</p>
            <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-500">Total Value</span>
                <span className="font-semibold">${(project.totalAmount || 0).toLocaleString()}</span>
            </div>
        </div>
    )
}

export default function Transactions() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [transactions, setTransactions] = useState([]);
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
            setLoading(false);
        }, err => {
            console.error("Error fetching projects:", err);
            setError("Could not load projects.");
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user, selectedProjectId]);

    useEffect(() => {
        if (!selectedProjectId || !user) {
            setTransactions([]);
            return;
        };
        
        const q = query(
            collection(db, 'milestones'), 
            where('jobId', '==', selectedProjectId), 
            where('uid', '==', user.uid),
            where('status', '==', 'completed')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, err => {
            console.error("Error fetching transactions:", err);
            setError("Could not load transactions for this project.");
        });

        return () => unsubscribe();
    }, [selectedProjectId, user]);

    const selectedProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="p-4 md:p-8">
            <div className="md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Transactions</h1>
                 {projects.length > 0 && (
                    <div className="flex-shrink-0">
                        <select 
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="w-full md:w-auto text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        >
                            {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
                        </select>
                    </div>
                )}
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : error ? (
                 <div className="p-8 text-center text-red-500">{error}</div>
            ) : (
                <div className="md:flex md:space-x-8">
                    <div className="md:w-1/3 mb-6 md:mb-0">
                        <PropertyCard project={selectedProject} />
                    </div>
                    <div className="md:w-2/3">
                        {transactions.length === 0 ? (
                             <div className="text-center py-16 border-2 border-dashed rounded-lg">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
                                </svg>
                                <h2 className="mt-2 text-lg font-semibold text-gray-900">No Payments Yet</h2>
                                <p className="mt-1 text-sm text-gray-500">No payments yet — create a milestone to start collecting.</p>
                                <div className="mt-6">
                                    <button onClick={() => navigate('/dashboard/milestones')} type="button" className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                                        Create a Milestone
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Milestone Title</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Project Name</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {transactions.map(t => (
                                            <tr key={t.id}>
                                                <td className="p-4 text-sm font-medium text-gray-900">{t.title}</td>
                                                <td className="p-4 text-sm text-gray-600">{t.projectName}</td>
                                                <td className="p-4 text-sm font-semibold text-green-600">${(t.amount || 0).toLocaleString()}</td>
                                                <td className="p-4 text-sm"><StatusBadge status={t.status} /></td>
                                                <td className="p-4 text-sm text-gray-600">{t.releasedAt?.toDate().toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
