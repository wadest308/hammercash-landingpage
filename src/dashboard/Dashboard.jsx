import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- ICONS (Heroicons placeholders) ---
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 12h.01M8 12h.01M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 18v-2m0-10V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v1m12 12a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2z" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.95V5a1 1 0 00-2 0v.05A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

// --- Components ---

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: <ChartBarIcon /> },
        { name: 'Jobs', icon: <BriefcaseIcon /> },
        { name: 'Milestones', icon: <CheckCircleIcon /> },
        { name: 'Payments', icon: <CurrencyDollarIcon /> },
        { name: 'Clients', icon: <UserGroupIcon /> },
        { name: 'Settings', icon: <CogIcon /> },
    ];

    return (
        <aside className="bg-gray-900 text-gray-300 w-64 flex-shrink-0 flex flex-col">
            <div className="h-16 flex items-center justify-center text-white text-2xl font-semibold border-b border-gray-800">
                HammerCash
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                            item.name === 'Dashboard' 
                                ? 'bg-gray-800 text-white' 
                                : 'hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <span className="mr-4">{item.icon}</span>
                        {item.name}
                    </a>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe" alt="User avatar" />
                    <div className="ml-4">
                        <p className="font-semibold text-white">John Doe</p>
                        <p className="text-sm text-gray-400">Contractor</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8">
             <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon className="text-gray-400" />
                </span>
                <input 
                    type="text" 
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    placeholder="Search for jobs, clients..."
                />
            </div>
            <div className="flex items-center space-x-6">
                <button className="text-gray-500 hover:text-gray-700">
                    <BellIcon />
                </button>
                <button onClick={() => navigate('/dashboard/create')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700">
                    + New Job
                </button>
            </div>
        </header>
    );
};

const KpiCard = ({ title, value, change, icon }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <span className="text-gray-400">{icon}</span>
            </div>
            <div className="mt-2">
                <p className="text-3xl font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

const JobsTable = () => {
    const jobs = [
        { name: 'E-commerce Platform', client: 'Stripe', status: 'In Progress', progress: 75, nextMilestone: '$5,000' },
        { name: 'SaaS Dashboard', client: 'Vercel', status: 'Pending', progress: 10, nextMilestone: '$2,500' },
        { name: 'Mobile App API', client: 'Figma', status: 'Completed', progress: 100, nextMilestone: '-' },
        { name: 'Marketing Website', client: 'Notion', status: 'In Progress', progress: 40, nextMilestone: '$8,000' },
    ];
    
    const StatusBadge = ({status}) => {
        const base = "px-2.5 py-0.5 rounded-full text-xs font-medium";
        const styles = {
            'In Progress': 'bg-blue-100 text-blue-800',
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Completed': 'bg-green-100 text-green-800',
        }
        return <span className={`\${base} \${styles[status]}`}>{status}</span>
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900">Active Jobs</h2>
            </div>
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Milestone</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {jobs.map(job => (
                        <tr key={job.name} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.client}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={job.status} /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `\${job.progress}%` }}></div>
                                    </div>
                                    <span>{job.progress}%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.nextMilestone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MilestoneCard = ({ milestone }) => {
    const statusColors = {
        'Awaiting Approval': 'bg-yellow-100 text-yellow-800',
        'Funded': 'bg-blue-100 text-blue-800',
    };
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
            <div>
                <p className="font-semibold text-gray-900">{milestone.name}</p>
                <p className="text-sm text-gray-500">{milestone.job}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-gray-900">{milestone.amount}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[milestone.status]}`}>{milestone.status}</span>
            </div>
        </div>
    );
};

const ActivityFeedItem = ({ activity }) => {
    const iconMap = {
        payment: <CurrencyDollarIcon className="h-5 w-5 text-green-500" />,
        approval: <CheckCircleIcon className="h-5 w-5 text-blue-500" />,
        update: <BriefcaseIcon className="h-5 w-5 text-gray-500" />,
    }
    return (
        <div className="flex space-x-4">
            <div className="bg-gray-100 rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center">
                {iconMap[activity.type]}
            </div>
            <div>
                <p className="text-sm text-gray-800">{activity.description}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
        </div>
    );
};


const Dashboard = () => {
    const kpis = [
        { title: 'Total Active Jobs', value: '12', icon: <BriefcaseIcon /> },
        { title: 'Total Locked Funds', value: '$42,500', icon: <CurrencyDollarIcon /> },
        { title: 'Released Payments', value: '$120,750', icon: <CheckCircleIcon /> },
        { title: 'Pending Milestones', value: '3', icon: <ChartBarIcon /> },
    ];
    
    const milestones = [
        { name: 'Phase 2: UI Design', job: 'E-commerce Platform', amount: '$5,000', status: 'Awaiting Approval' },
        { name: 'Backend Integration', job: 'SaaS Dashboard', amount: '$2,500', status: 'Funded' },
        { name: 'Content Strategy', job: 'Marketing Website', amount: '$8,000', status: 'Funded' },
    ];
    
    const activities = [
        { type: 'payment', description: 'Payment of $2,500 for "Mobile App API" cleared.', time: '10 minutes ago' },
        { type: 'approval', description: 'You approved milestone "Phase 1" for "E-commerce Platform".', time: '1 hour ago' },
        { type: 'update', description: '"SaaS Dashboard" job status changed to In Progress.', time: '3 hours ago' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map(kpi => <KpiCard key={kpi.title} {...kpi} />)}
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-8">
                        {/* Main Content: Jobs Table */}
                        <div className="col-span-2">
                           <JobsTable />
                        </div>

                        {/* Right Sidebar: Milestones & Activity */}
                        <div className="col-span-1 space-y-8">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Milestones</h2>
                                <div className="space-y-4">
                                    {milestones.map(m => <MilestoneCard key={m.name} milestone={m} />)}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                                 <div className="space-y-6">
                                    {activities.map((act, i) => <ActivityFeedItem key={i} activity={act} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

