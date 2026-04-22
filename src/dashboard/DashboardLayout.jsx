import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Dashboard.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'My Jobs', icon: 'work', path: '/dashboard/jobs' },
  { label: 'Create Job', icon: 'add_circle', path: '/dashboard/create' },
  { label: 'Payments', icon: 'payments', path: '/dashboard/payments' },
  { label: 'Account', icon: 'person', path: '/dashboard/account' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleStripeConnect = async () => {
    try {
      const response = await fetch('/api/stripe/connect', { method: 'POST' });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Stripe connect error:', err);
    }
  };

  const contractorName = 'Wade';

  return (
    <div className="dashboard-wrapper">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo-area">
          <img src="/logo2.png" alt="HammerCash" />
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">© 2026 HammerCash</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="dashboard-main">
        {/* Top bar */}
        <header className="dashboard-topbar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="topbar-mobile-logo">
            <img src="/logo2.png" alt="HammerCash" />
          </div>

          <div className="topbar-left">
            <h1 className="topbar-welcome">Welcome back, {contractorName} 👋</h1>
            <p className="topbar-subtitle">Here's what's happening with your jobs today.</p>
          </div>

          <div className="topbar-right">
            {stripeConnected ? (
              <div className="stripe-connected-badge">
                <span className="material-symbols-outlined">check_circle</span>
                Stripe Connected
              </div>
            ) : (
              <button
                className="stripe-connect-btn"
                onClick={handleStripeConnect}
              >
                <span className="material-symbols-outlined">account_balance</span>
                <span className="btn-label">Connect with Stripe</span>
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
