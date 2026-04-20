import React from 'react';

const FounderSection = () => {
  return (
    <section id="about" className="bg-[#1a1a1a] w-full py-20 text-center px-8">
      <div className="max-w-3xl mx-auto">
        <h4 className="font-headline text-3xl font-bold text-white mb-4">Why I built this.</h4>
        <p className="font-body text-lg text-white/80 leading-relaxed">
          I watched too many skilled contractors get stiffed after doing great work. The customer has all the power once the job is done. HammerCash flips that.  Your customer has already paid through Stripe before you start a single day of work.
        </p>
        <p className="font-body text-lg text-white/80 leading-relaxed mt-4">
          — Wade, Founder of HammerCash
        </p>
      </div>
    </section>
  );
};

export default FounderSection;
