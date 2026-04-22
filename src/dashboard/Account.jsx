import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROFILE = {
  name: 'Wade',
  email: 'wade@example.com',
  phone: '(555) 123-4567',
  trade: 'General Contractor',
};

const NOTIFICATIONS = {
  email_payment: true,
  email_milestone: false,
  sms_payment: true,
};

export default function Account() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(PROFILE);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [stripeStatus, setStripeStatus] = useState('connected'); // 'connected' | 'disconnected' | 'warning'
  const [stripeAccountId, setStripeAccountId] = useState('acct_1PxYzZK1H3j9Zx');

  const handleSave = () => {
    // Save profile changes (mock)
    setEditing(false);
  };

  const handleStripeConnect = async () => {
    // Call backend to create Stripe account link
    try {
      const res = await fetch('/api/stripe/connect', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Stripe connect error:', err);
    }
  };

  const handleManageStripe = () => {
    // Link to Stripe dashboard
    window.open(`https://dashboard.stripe.com/${stripeAccountId}`, '_blank');
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ac-wrapper">
      <h1 className="ac-title">Account Settings</h1>
      <p className="ac-subtitle">Manage your profile, Stripe connection, and notifications.</p>

      <div className="ac-sections">
        {/* ── Profile Section ── */}
        <section className="ac-section">
          <h2 className="ac-section-title">Profile</h2>
          <div className="ac-card">
            <div className="ac-profile-grid">
              <div className="ac-field">
                <label className="ac-label">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    className="ac-input"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                ) : (
                  <p className="ac-value">{profile.name}</p>
                )}
              </div>
              <div className="ac-field">
                <label className="ac-label">Email Address</label>
                {editing ? (
                  <input
                    type="email"
                    className="ac-input"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                ) : (
                  <p className="ac-value">{profile.email}</p>
                )}
              </div>
              <div className="ac-field">
                <label className="ac-label">Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    className="ac-input"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                ) : (
                  <p className="ac-value">{profile.phone}</p>
                )}
              </div>
              <div className="ac-field">
                <label className="ac-label">Trade Type</label>
                {editing ? (
                  <select
                    className="ac-input"
                    value={profile.trade}
                    onChange={(e) => setProfile({ ...profile, trade: e.target.value })}
                  >
                    <option>General Contractor</option>
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>HVAC</option>
                    <option>Carpenter</option>
                    <option>Painter</option>
                    <option>Landscaper</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <p className="ac-value">{profile.trade}</p>
                )}
              </div>
            </div>
            <div className="ac-card-footer">
              {editing ? (
                <button className="ac-btn ac-btn-primary" onClick={handleSave}>
                  <span className="material-symbols-outlined">save</span>
                  Save Changes
                </button>
              ) : (
                <button className="ac-btn ac-btn-primary" onClick={() => setEditing(true)}>
                  <span className="material-symbols-outlined">edit</span>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Stripe Connection Section ── */}

        <section className="ac-section">
          <h2 className="ac-section-title">Stripe Connection</h2>
          <div className="ac-card">
            {stripeStatus === 'disconnected' && (
              <div className="ac-stripe-content">
                <div className="ac-stripe-icon">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <p className="ac-stripe-desc">
                  Connect your Stripe account to accept payments and manage invoices.
                </p>
                <button className="ac-btn ac-btn-stripe" onClick={handleStripeConnect}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                  Connect with Stripe
                </button>
              </div>
            )}

            {stripeStatus === 'connected' && (
              <div className="ac-stripe-content">
                <div className="ac-stripe-icon ac-stripe-icon-success">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="ac-stripe-info">
                  <span className="ac-stripe-badge ac-stripe-badge-green">
                    Connected
                  </span>
                  <p className="ac-stripe-account">Account ID: {stripeAccountId}</p>
                </div>
                <button className="ac-btn ac-btn-outline" onClick={handleManageStripe}>
                  <span className="material-symbols-outlined">open_in_new</span>
                  Manage Stripe Account
                </button>
              </div>
            )}

            {stripeStatus === 'warning' && (
              <div className="ac-stripe-content">
                <div className="ac-stripe-icon ac-stripe-icon-warning">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <div className="ac-stripe-info">
                  <span className="ac-stripe-badge ac-stripe-badge-yellow">
                    Action Required
                  </span>
                  <p className="ac-stripe-msg">
                    Your Stripe connection needs attention. Please re-connect to continue receiving payments.
                  </p>
                </div>
                <button className="ac-btn ac-btn-stripe" onClick={handleStripeConnect}>
                  <span className="material-symbols-outlined">refresh</span>
                  Re-connect
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Notifications Section ── */}

        <section className="ac-section">
          <h2 className="ac-section-title">Notifications</h2>
          <div className="ac-card">
            <div className="ac-toggle-list">
              <div className="ac-toggle-row">
                <div className="ac-toggle-info">
                  <span className="material-symbols-outlined">email</span>
                  <div>
                    <p className="ac-toggle-label">Email when customer pays</p>
                    <p className="ac-toggle-desc">Receive an email notification when a payment is received</p>
                  </div>
                </div>
                <label className="ac-toggle">
                  <input
                    type="checkbox"
                    checked={notifications.email_payment}
                    onChange={() => toggleNotification('email_payment')}
                  />
                  <span className="ac-toggle-slider"></span>
                </label>
              </div>

              <div className="ac-toggle-row">
                <div className="ac-toggle-info">
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <p className="ac-toggle-label">Email when milestone is due</p>
                    <p className="ac-toggle-desc">Get reminders before milestone due dates</p>
                  </div>
                </div>
                <label className="ac-toggle">
                  <input
                    type="checkbox"
                    checked={notifications.email_milestone}
                    onChange={() => toggleNotification('email_milestone')}
                  />
                  <span className="ac-toggle-slider"></span>
                </label>
              </div>

              <div className="ac-toggle-row">
                <div className="ac-toggle-info">
                  <span className="material-symbols-outlined">sms</span>
                  <div>
                    <p className="ac-toggle-label">SMS payment confirmations</p>
                    <p className="ac-toggle-desc">Receive text messages when payments are confirmed</p>
                  </div>
                </div>
                <label className="ac-toggle">
                  <input
                    type="checkbox"
                    checked={notifications.sms_payment}
                    onChange={() => toggleNotification('sms_payment')}
                  />
                  <span className="ac-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
