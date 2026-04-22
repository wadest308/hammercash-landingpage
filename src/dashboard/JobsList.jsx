import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const SAMPLE_JOBS = [
  {
    id: 'j1',
    title: 'Kitchen Remodel — Full Gut',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    total: 4800,
    status: 'in_progress',
    milestones: [
      { name: 'Demolition & Prep', amount: 1200, status: 'paid' },
      { name: 'Cabinets & Counters', amount: 2400, status: 'in_progress' },
      { name: 'Final Finishes', amount: 1200, status: 'pending' },
    ],
    link: 'https://pay.hammercash.com/invoice/k8x2m4n7',
  },
  {
    id: 'j2',
    title: 'Bathroom Tile Installation',
    customer: 'Mike Chen',
    email: 'mike@email.com',
    total: 2150,
    status: 'completed',
    milestones: [
      { name: 'Tile Removal', amount: 650, status: 'paid' },
      { name: 'New Tile Install', amount: 1000, status: 'paid' },
      { name: 'Grouting & Seal', amount: 500, status: 'paid' },
    ],
    link: 'https://pay.hammercash.com/invoice/p3q9w1z6',
  },
  {
    id: 'j3',
    title: 'Deck Build — Cedar 12×16',
    customer: 'Emily Rodriguez',
    email: 'emily@email.com',
    total: 6300,
    status: 'in_progress',
    milestones: [
      { name: 'Foundation & Framing', amount: 2100, status: 'paid' },
      { name: 'Decking & Railings', amount: 2800, status: 'in_progress' },
      { name: 'Staining & Finish', amount: 1400, status: 'pending' },
    ],
    link: 'https://pay.hammercash.com/invoice/d7f5h3j9',
  },
  {
    id: 'j4',
    title: 'Basement Waterproofing',
    customer: 'Tom Bradley',
    email: 'tom@email.com',
    total: 3250,
    status: 'pending',
    milestones: [
      { name: 'Assessment & Excavation', amount: 1200, status: 'pending' },
      { name: 'Membrane & Drainage', amount: 1300, status: 'pending' },
      { name: 'Backfill & Cleanup', amount: 750, status: 'pending' },
    ],
    link: 'https://pay.hammercash.com/invoice/b2c4e6g8',
  },
  {
    id: 'j5',
    title: 'Fence Repair — 40ft Section',
    customer: 'Lisa Park',
    email: 'lisa@email.com',
    total: 1200,
    status: 'completed',
    milestones: [
      { name: 'Remove Old Fence', amount: 400, status: 'paid' },
      { name: 'Install New Panels', amount: 800, status: 'paid' },
    ],
    link: 'https://pay.hammercash.com/invoice/f1r3t5y7',
  },
  {
    id: 'j6',
    title: 'Roof Patch & Gutter Clean',
    customer: 'David Kim',
    email: 'david@email.com',
    total: 950,
    status: 'in_progress',
    milestones: [
      { name: 'Roof Inspection & Patch', amount: 550, status: 'paid' },
      { name: 'Gutter Cleaning', amount: 400, status: 'in_progress' },
    ],
    link: 'https://pay.hammercash.com/invoice/r8o2p4s6',
  },
];

const TABS = [
  { key: 'all', label: 'All Jobs' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
];

const STATUS_MAP = {
  completed: { label: 'Completed', cls: 'jl-badge-green' },
  in_progress: { label: 'In Progress', cls: 'jl-badge-yellow' },
  pending: { label: 'Pending', cls: 'jl-badge-gray' },
};

const fmt = (n) =>
  Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function JobsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');

  const filtered = useMemo(() => {
    let result = [...SAMPLE_JOBS];
    
    if (tab !== 'all') {
      result = result.filter((j) => j.status === tab);
    }
    
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.customer.toLowerCase().includes(query),
      );
    }
    
    return result;
  }, [search, tab]);

  return (
    <div className="jl-wrapper">
      {/* Header */}
      <div className="jl-header">
        <div>
          <h1 className="jl-title">My Jobs</h1>
          <p className="jl-subtitle">{SAMPLE_JOBS.length} total jobs</p>
        </div>
        <button className="jl-new-btn" onClick={() => navigate('/dashboard/create')}>
          <span className="material-symbols-outlined">add</span>
          New Job
        </button>
      </div>

      {/* Search */}
      <div className="jl-search-wrap">
        <span className="material-symbols-outlined jl-search-icon">search</span>
        <input
          type="text"
          className="jl-search"
          placeholder="Search by job title or customer name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="jl-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`jl-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.key !== 'all' && (
              <span className="jl-tab-count">
                {SAMPLE_JOBS.filter((j) => j.status === t.key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="jl-empty">
          <span className="material-symbols-outlined">search_off</span>
          <p>No jobs found matching your filters.</p>
        </div>
      ) : (
        <div className="jl-grid">
          {filtered.map((job) => {
            const done = job.milestones.filter((m) => m.status === 'paid').length;
            const total = job.milestones.length;
            const pct = Math.round((done / total) * 100);
            const st = STATUS_MAP[job.status];

            return (
              <div key={job.id} className="jl-card">
                <div className="jl-card-top">
                  <div className="jl-card-info">
                    <h3 className="jl-card-title">{job.title}</h3>
                    <p className="jl-card-customer">{job.customer}</p>
                  </div>
                  <span className={`jl-badge ${st.cls}`}>{st.label}</span>
                </div>

                <div className="jl-card-amount">{fmt(job.total)}</div>

                {/* Progress */}
                <div className="jl-progress-section">
                  <div className="jl-progress-header">
                    <span className="jl-progress-label">
                      Milestones: {done}/{total}
                    </span>
                    <span className="jl-progress-pct">{pct}%</span>
                  </div>
                  <div className="jl-progress-track">
                    <div className="jl-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <button
                  className="jl-view-btn"
                  onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
                >
                  View Job
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { SAMPLE_JOBS };
