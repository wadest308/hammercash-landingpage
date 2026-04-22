import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-32 px-8 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-4">
          How It Works
        </h2>
        <p className="text-gray-500 text-lg mb-16">Simple setup. Clear payments. No confusion.</p>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FF8C00] mb-6 border border-gray-200 hover-circle-glow">
              <span className="font-headline text-3xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Create the Job</h3>
            <p className="text-neutral-500 leading-relaxed text-sm">Set the full price and split it into milestones before anything starts.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FF8C00] mb-6 border border-gray-200 hover-circle-glow">
              <span className="font-headline text-3xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Customer Pays via Stripe</h3>
            <p className="text-neutral-500 leading-relaxed text-sm">Your customer pays with a credit card before work begins. Powered by Stripe Connect.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#FF8C00] mb-6 border border-gray-200 hover-circle-glow">
              <span className="font-headline text-3xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Get Paid As You Go</h3>
            <p className="text-neutral-500 leading-relaxed text-sm">As each stage is finished, payment is sent directly to your connected Stripe account.</p>
          </div>
        </div>
        
        
        
      </div>
    </section>
  );
};

export default HowItWorks;
