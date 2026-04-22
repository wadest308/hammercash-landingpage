import React from 'react';
import { Link } from 'react-router-dom';

function RefundPolicy() {
  return (
    <section className="bg-[#1e1e1e] min-h-screen font-body text-[#e5e5e5] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-[#FF8C00] hover:underline font-bold">← Back to HammerCash</Link>
        </div>
        <div className="bg-[#2a2a2a] p-8 md:p-12 rounded-lg shadow-lg border border-neutral-700">
          <h1 className="font-headline text-4xl font-bold text-white mb-4">Refund Policy</h1>
          <p className="text-sm text-neutral-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">1. Platform Subscriptions & Fees</h2>
              <p className="leading-relaxed">
                HammerCash charges a 3% platform fee on transactions. This fee is non-refundable once a transaction has been successfully processed by Stripe.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">2. Contractor to Customer Refunds</h2>
              <p className="leading-relaxed">
                HammerCash provides a software platform to facilitate payments via Stripe Connect. We do not act as an escrow service and do not hold funds. Therefore, any disputes, cancellations, or refund requests related to contracting services must be resolved directly between the customer and the contractor.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">3. Processing Reversals</h2>
              <p className="leading-relaxed">
                If a contractor agrees to refund a customer, the refund must be initiated through their connected Stripe account. Stripe's standard policies apply to all payment reversals and refunds.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">4. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this policy, contact us at wadelieu17@gmail.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RefundPolicy;
