import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import RefundPolicy from './RefundPolicy';
import Contact from './Contact';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import CreateJob from './CreateJob';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';
import DashboardCreateJob from './dashboard/CreateJob';
import JobsList from './dashboard/JobsList';
import JobDetail from './dashboard/JobDetail';
import Account from './dashboard/Account';
import Payments from './dashboard/Payments';

import Login from './Login';

import ProtectedRoute from './ProtectedRoute';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/pay" element={<Elements stripe={stripePromise}><PaymentForm /></Elements>} />
        <Route path="/login" element={<Login />} />


        {/* Contractor Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="create" element={<DashboardCreateJob />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="account" element={<Account />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
