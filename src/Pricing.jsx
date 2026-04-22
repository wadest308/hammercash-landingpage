import React from 'react';

const Pricing = ({ openModal }) => {
  return (
    <section className="py-12 md:py-32 px-8 bg-[#FFFFFF]" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="bg-[#FF8C00] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">PRICING.</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mt-4">Only 3%. Pay when you get paid.</h2>
          <p className="text-[#564334] text-lg max-w-2xl mx-auto">No upfront cost. No monthly fees.</p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white p-12 md:p-16 rounded-3xl border border-[#ddc1ae] flex flex-col shadow-xl max-w-3xl text-center items-center">
            <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-[#2D2D2D] mb-6">Pay As You Go.</h3>
            <p className="text-[#564334] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              HammerCash charges a 3% platform fee which is deducted from each payment after your customer pays. Stripe's standard card processing fees are separate and also apply to every transaction.
            </p>
            <ul className="text-left space-y-2 mb-10">
              <li className="flex items-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> You only pay when money comes in</li>
              <li className="flex items-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Simple and clear pricing</li>
              <li className="flex items-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Built for contractors of all sizes</li>
            </ul>
            <button
              onClick={openModal}
              style={{
                backgroundColor: '#FF8C00',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '18px'
              }}>
              Create Your First Job
            </button>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
