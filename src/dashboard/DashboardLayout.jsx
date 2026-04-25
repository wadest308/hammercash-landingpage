
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import NewProjectModal from './NewProjectModal'; // Import the new modal

const NAV_ITEMS = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { label: 'Projects', icon: 'assignment', path: '/dashboard/projects' },
    { label: 'Milestones', icon: 'account_tree', path: '/dashboard/milestones' },
    { label: 'Transactions', icon: 'receipt_long', path: '/dashboard/transactions' },
    { label: 'Settings', icon: 'settings', path: '/dashboard/settings' },
];

const SuccessToast = ({ message, show }) => {
    if (!show) return null;
    return (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
            {message}
        </div>
    );
};

export default function DashboardLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const auth = getAuth();
    const user = auth.currentUser;
    const photoURL = user?.photoURL || '/default-avatar.png';

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    // Close sidebar on route change for mobile
    useEffect(() => {
        if (sidebarOpen) setSidebarOpen(false);
    }, [location.pathname]);

    return (
        <div className="antialiased text-text-primary md:flex">
            <NewProjectModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onRefresh={() => setRefreshKey(prev => prev + 1)}
            />

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside className={`h-screen w-64 fixed left-0 top-0 border-r border-neutral-800 bg-neutral-900 flex-col py-6 font-['Inter'] antialiased z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
                <div className="px-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white font-black">H</div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-white">HammerCash</h1>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                `text-neutral-400 hover:text-white hover:bg-neutral-800/50 flex items-center px-6 py-3 gap-3 transition-colors duration-200 ease-in-out ${isActive ? 'bg-neutral-800 text-orange-500 border-r-2 border-orange-500' : ''}`
                            }
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="px-6 mt-auto">
                    <button onClick={() => setShowModal(true)} className="w-full py-2.5 px-4 bg-orange-500 text-white rounded font-semibold text-sm hover:bg-orange-600 transition-colors mb-6">
                        New Project
                    </button>
                    <div className="space-y-1">
                        <a className="text-neutral-400 hover:text-white flex items-center py-2 gap-3 transition-colors text-sm" href="#">
                            <span className="material-symbols-outlined text-sm">help</span>
                            Help Center
                        </a>
                        <button onClick={handleLogout} className="text-neutral-400 hover:text-white flex items-center py-2 gap-3 transition-colors text-sm w-full text-left">
                            <span className="material-symbols-outlined text-sm">logout</span>
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 min-h-screen md:ml-64">
                <header className="fixed top-0 right-0 left-0 md:left-64 h-16 border-b border-neutral-200 bg-white flex justify-between items-center px-4 md:px-8 z-30">
                    <div className="md:hidden">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                    <div className="hidden md:block">{/* Header content can go here */}</div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden ml-2">
                            <img className="w-full h-full object-cover" src={photoURL} alt="User Avatar"/>
                        </div>
                    </div>
                </header>
                <div className="pt-16">
                    <Outlet context={{ refreshKey }} />
                </div>
            </main>
        </div>
    );
}
