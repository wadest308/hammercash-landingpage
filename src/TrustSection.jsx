import React from 'react';

const TrustSection = () => {
  return (
    <section id="trust-security" className="py-12 md:py-32 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-12">
          Payments You Can Count On
        </h2>
        <ul className="space-y-8 text-left max-w-3xl mx-auto">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            <div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Funds Secured Upfront</h3>
              <p className="text-neutral-600">Your customer pays through Stripe before work begins. Funds go directly to your connected Stripe account.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            <div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Milestone Payments</h3>
              <p className="text-neutral-600">You get paid at each milestone as work is completed. Stripe routes each payment directly to your account.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            <div>
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Ironclad Protection</h3>
              <p className="text-neutral-600">Every transaction is secured and tracked by Stripe. Full payment records are available for both parties.</p>
            </div>
          </li>
        </ul>
        <p className="text-2xl font-bold text-[#2D2D2D] mt-16">With us, you can finally work with confidence.</p>
      </div>
    </section>
  );
};

export default TrustSection;
