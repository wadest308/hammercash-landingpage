import React, { useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SAMPLE_JOBS } from './JobsList';

const fmt = (n) =>
  Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

const MS_STATUS = {
  paid: { label: 'Paid', cls: 'jd-ms-paid' },
  in_progress: { label: 'In Progress', cls: 'jd-ms-progress' },
  pending: { label: 'Pending', cls: 'jd-ms-pending' },
};

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const linkRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const job = SAMPLE_JOBS.find((j) => j.id === id);

  // local milestone state so "Mark Complete" works interactively
  const [milestones, setMilestones] = useState(() =>
    job ? job.milestones.map((m) => ({ ...m })) : [],
  );

  if (!job) {
    return (
      <div className="jd-wrapper">
        <div className="jd-empty">
          <span className="material-symbols-outlined">error_outline</span>
          <h2>Job not found</h2>
          <button className="jl-view-btn" onClick={() => navigate('/dashboard/jobs')}>
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(job.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      if (linkRef.current) {
        linkRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const markComplete = (idx) => {
    setMilestones((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], status: 'paid' };
      return next;
    });
  };

  const paidTotal = milestones
    .filter((m) => m.status === 'paid')
    .reduce((s, m) => s + m.amount, 0);
  const remaining = job.total - paidTotal;
  const doneMilestones = milestones.filter((m) => m.status === 'paid').length;

  return (
    <div className="jd-wrapper">
      {/* Back */}
      <button className="jd-back" onClick={() => navigate('/dashboard/jobs')}>
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Jobs
      </button>

      {/* Top bar */}
      <div className="jd-top">
        <div>
          <h1 className="jd-title">{job.title}</h1>
          <div className="jd-meta">
            <span className="jd-meta-item">
              <span className="material-symbols-outlined">person</span>
              {job.customer}
            </span>
            <span className="jd-meta-item">
              <span className="material-symbols-outlined">mail</span>
              {job.email}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="jd-layout">
        {/* Left column */}
        <div className="jd-main">
          {/* Milestone Tracker */}
          <div className="jd-section">
            <h2 className="jd-section-title">Milestone Tracker</h2>
            <div className="jd-milestones">
              {milestones.map((m, i) => {
                const st = MS_STATUS[m.status];
                const canComplete = m.status !== 'paid';
                return (
                  <div key={i} className={`jd-ms-card ${st.cls}`}>
                    <div className="jd-ms-left">
                      <div className="jd-ms-num">{i + 1}</div>
                      <div className="jd-ms-info">
                        <span className="jd-ms-name">{m.name}</span>
                        <span className="jd-ms-amount">{fmt(m.amount)}</span>
                      </div>
                    </div>
                    <div className="jd-ms-right">
                      <span className={`jd-ms-badge ${st.cls}`}>{st.label}</span>
                      {canComplete && (
                        <button
                          className="jd-ms-complete-btn"
                          onClick={() => markComplete(i)}
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Link */}
          <div className="jd-section">
            <h2 className="jd-section-title">Payment Link</h2>
            <p className="jd-section-sub">
              Share this link with your customer to collect payment.
            </p>
            <div className="jd-link-box">
              <input
                ref={linkRef}
                type="text"
                readOnly
                value={job.link}
                className="jd-link-input"
                onClick={(e) => e.target.select()}
              />
              <button className="jd-copy-btn" onClick={handleCopy}>
                <span className="material-symbols-outlined">
                  {copied ? 'done' : 'content_copy'}
                </span>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="jd-sidebar">
          <h2 className="jd-sidebar-title">Job Summary</h2>

          <div className="jd-summary-rows">
            <div className="jd-summary-row">
              <span className="jd-summary-label">Total Amount</span>
              <span className="jd-summary-value jd-orange">{fmt(job.total)}</span>
            </div>
            <div className="jd-summary-row">
              <span className="jd-summary-label">Amount Paid</span>
              <span className="jd-summary-value jd-green">{fmt(paidTotal)}</span>
            </div>
            <div className="jd-summary-row">
              <span className="jd-summary-label">Remaining</span>
              <span className="jd-summary-value">{fmt(remaining)}</span>
            </div>
            <div className="jd-summary-divider" />
            <div className="jd-summary-row">
              <span className="jd-summary-label">Milestones</span>
              <span className="jd-summary-value">
                {doneMilestones}/{milestones.length} complete
              </span>
            </div>
          </div>

          {/* Progress ring */}
          <div className="jd-progress-ring-wrap">
            <svg viewBox="0 0 120 120" className="jd-progress-ring">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#F97316"
                strokeWidth="10"
                strokeDasharray={`${(paidTotal / job.total) * 314} 314`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="jd-ring-label">
              <span className="jd-ring-pct">
                {Math.round((paidTotal / job.total) * 100)}%
              </span>
              <span className="jd-ring-sub">Paid</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
