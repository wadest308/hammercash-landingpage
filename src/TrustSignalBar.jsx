import React from 'react';

const TrustSignalBar = () => {
  return (
    <section id="about" className="py-12 px-8 bg-white border-y border-[#ddc1ae]/30">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h2 className="font-headline text-3xl font-extrabold text-[#2D2D2D] text-center">Payments handled securely with Stripe.</h2>
        <p className="text-gray-500 text-lg text-center">Stripe handles all payment routing directly to your account.</p>
        <div className="flex justify-center items-center gap-12 lg:gap-20 opacity-80">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-[#635BFF]">credit_card</span>
            <span className="font-headline font-bold text-xl text-[#2D2D2D]">Stripe</span>
          </div>
          <p className="text-sm text-gray-500">Powered by Stripe Connect</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-[#4CAF50]">lock</span>
            <span className="font-headline font-bold text-xl text-[#2D2D2D]">SSL Secured</span>
          </div>
        </div>
        <ul className="text-center space-y-2">
          <li className="flex items-center justify-center md:justify-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Customers pay through secure online checkout</li>
          <li className="flex items-center justify-center md:justify-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Payments are processed directly through Stripe Connect before work begins</li>
          <li className="flex items-center justify-center md:justify-start gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Payments are routed to your Stripe account at each milestone</li>
        </ul>
        <p className="text-[#564334]/60 font-medium text-sm text-center">
          Built for contractors who want to get paid on time, every time.
        </p>
      </div>
    </section>
  );
};

export default TrustSignalBar;
