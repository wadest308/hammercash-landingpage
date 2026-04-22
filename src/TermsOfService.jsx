import React from 'react';
import { Link } from 'react-router-dom';

function TermsOfService() {
  return (
    <section className="bg-[#1e1e1e] min-h-screen font-body text-[#e5e5e5] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-[#FF8C00] hover:underline font-bold">← Back to HammerCash</Link>
        </div>
        <div className="bg-[#2a2a2a] p-8 md:p-12 rounded-lg shadow-lg border border-neutral-700">
          <h1 className="font-headline text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-sm text-neutral-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">1. About HammerCash</h2>
              <p className="leading-relaxed">
                HammerCash is a software platform for collecting and tracking payments using Stripe Connect. HammerCash is not a bank, escrow service, or financial institution. We do not hold or control funds.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">2. Accepting These Terms</h2>
              <p className="leading-relaxed">
                By creating an account you agree to these terms. If you do not agree, do not use the platform.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">3. Your Account</h2>
              <p className="leading-relaxed">
                You are responsible for keeping your credentials secure and providing accurate information.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">4. Payments and Fees</h2>
              <p className="leading-relaxed">
                All payments are processed through Stripe. HammerCash charges a 3% platform fee per transaction, deducted before funds route to your connected Stripe account. HammerCash does not hold contractor funds at any point.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">5. Payment Processing</h2>
              <p className="leading-relaxed">
                Payments are processed by Stripe. By using HammerCash, contractors agree to Stripe's Terms of Service and Connected Account Agreement. HammerCash is a platform only and is not a bank, escrow service, or financial institution.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">6. Contractor Responsibilities</h2>
              <p className="leading-relaxed">
                Contractors are responsible for completing agreed work, fulfilling legal trade obligations, and managing their own Stripe account.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">7. Prohibited Use</h2>
              <p className="leading-relaxed">
                Do not use HammerCash for illegal services, false information, or anything that violates Stripe's Terms of Service.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                HammerCash provides software only. We are not responsible for contractor disputes, work quality, or failed payments.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">9. Refunds and Cancellations</h2>
              <p className="leading-relaxed">
                HammerCash does not issue refunds as we do not hold or control any funds. If a job is cancelled before or during work, refund and cancellation terms are agreed upon directly between the contractor and their customer. All payment reversals are handled by Stripe according to their standard policies.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">10. Contact</h2>
              <p className="leading-relaxed">
                wadelieu17@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TermsOfService;
