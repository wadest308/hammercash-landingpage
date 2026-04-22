import React from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [
  {
    label: 'Total Earnings',
    value: '$12,480.00',
    icon: 'account_balance_wallet',
    trend: '+8.2% this month',
  },
  {
    label: 'Active Jobs',
    value: '3',
    icon: 'construction',
    trend: '2 starting this week',
  },
  {
    label: 'Pending Payments',
    value: '$3,250.00',
    icon: 'hourglass_top',
    trend: '2 awaiting release',
  },
];

const RECENT_JOBS = [
  {
    id: 1,
    title: 'Kitchen Remodel — Full Gut',
    customer: 'Sarah Johnson',
    amount: '$4,800.00',
    status: 'in_progress',
  },
  {
    id: 2,
    title: 'Bathroom Tile Installation',
    customer: 'Mike Chen',
    amount: '$2,150.00',
    status: 'paid',
  },
  {
    id: 3,
    title: 'Deck Build — Cedar 12x16',
    customer: 'Emily Rodriguez',
    amount: '$6,300.00',
    status: 'in_progress',
  },
  {
    id: 4,
    title: 'Basement Waterproofing',
    customer: 'Tom Bradley',
    amount: '$3,250.00',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Fence Repair — 40ft Section',
    customer: 'Lisa Park',
    amount: '$1,200.00',
    status: 'paid',
  },
];

const STATUS_CONFIG = {
  paid: { label: 'Paid', className: 'badge-paid' },
  in_progress: { label: 'In Progress', className: 'badge-progress' },
  pending: { label: 'Pending', className: 'badge-pending' },
};

export default function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-home">
      {/* ── Stat Cards ── */}
      <section className="stats-section">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-card-v2">
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div className="stat-icon-ring">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
            </div>
            <span className="stat-card-value">{stat.value}</span>
            <span className="stat-card-trend">{stat.trend}</span>
          </div>
        ))}
      </section>

      {/* ── Recent Jobs ── */}
      <section className="recent-jobs-section">
        <div className="section-header">
          <h2 className="section-title">Recent Jobs</h2>
          <button
            className="section-link"
            onClick={() => navigate('/dashboard/jobs')}
          >
            View all
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        {/* Desktop table */}
        <div className="jobs-table-wrapper">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {RECENT_JOBS.map((job) => {
                const status = STATUS_CONFIG[job.status];
                return (
                  <tr key={job.id}>
                    <td className="job-title-cell">{job.title}</td>
                    <td className="job-customer-cell">{job.customer}</td>
                    <td className="job-amount-cell">{job.amount}</td>
                    <td>
                      <span className={`status-badge ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="jobs-card-list">
          {RECENT_JOBS.map((job) => {
            const status = STATUS_CONFIG[job.status];
            return (
              <div key={job.id} className="job-card-mobile">
                <div className="job-card-top">
                  <div className="job-card-info">
                    <span className="job-card-title">{job.title}</span>
                    <span className="job-card-customer">{job.customer}</span>
                  </div>
                  <span className={`status-badge ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <div className="job-card-bottom">
                  <span className="job-card-amount">{job.amount}</span>
                  <button className="view-btn">View</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quick Actions ── */}
      <section className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-row">
          <button
            className="quick-action-btn"
            onClick={() => navigate('/dashboard/create')}
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="quick-action-label">Create New Job</span>
            <span className="quick-action-sub">Set up milestones &amp; send an invoice</span>
          </button>
          <button
            className="quick-action-btn quick-action-outline"
            onClick={() => navigate('/dashboard/jobs')}
          >
            <span className="material-symbols-outlined">work</span>
            <span className="quick-action-label">View All Jobs</span>
            <span className="quick-action-sub">Manage your active &amp; completed jobs</span>
          </button>
        </div>
      </section>
    </div>
  );
}
