import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payments() {
  const navigate = useNavigate();

  return (
    <div className="payments-wrapper">
      <div className="payments-card">
        <div className="payments-icon">
          <span className="material-symbols-outlined">payments</span>
        </div>
        <h1 className="payments-title">Payments</h1>
        <p className="payments-desc">
          View your payment history, payout schedules, and transaction details.
        </p>
        <p className="payments-note">
          This feature is coming soon. You'll be able to see all your incoming payments, track when they'll be deposited, and access detailed receipts.
        </p>
        <button className="payments-back" onClick={() => navigate('/dashboard')}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
