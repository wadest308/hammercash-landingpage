
import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <section className="bg-[#1e1e1e] min-h-screen font-body text-[#e5e5e5] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-[#FF8C00] hover:underline font-bold">← Back to HammerCash</Link>
        </div>
        <div className="bg-[#2a2a2a] p-8 md:p-12 rounded-lg shadow-lg border border-neutral-700">
          <h1 className="font-headline text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-sm text-neutral-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">1. Introduction</h2>
              <p className="leading-relaxed">
                HammerCash is a software platform that helps contractors collect and track payments using Stripe Connect. This policy explains what information we collect and how we use it.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">2. Information We Collect</h2>
              <p className="leading-relaxed">
                Your name and email when you sign up. Job and payment details you enter. Payment data processed through Stripe. We do not store card numbers or banking details.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">3. How We Use Your Information</h2>
              <p className="leading-relaxed">
                To operate and improve the platform. To process payments through Stripe. To send account and job notifications.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">4. Payments</h2>
              <p className="leading-relaxed">
                All payments are processed by Stripe. HammerCash does not store, hold, or control your funds. Visit stripe.com/privacy for details.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">5. Data Sharing</h2>
              <p className="leading-relaxed">
                We do not sell your personal information. We only share data with Stripe and service providers needed to operate the platform.
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">6. Your Rights</h2>
              <p className="leading-relaxed">
                You may request access to or deletion of your data by emailing contact@hammercash.com
              </p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-[#FF8C00] mb-3">7. Contact</h2>
              <p className="leading-relaxed">
                contact@hammercash.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
