import React from 'react';

const FounderSection = () => {
  return (
    <div className="w-full max-w-3xl bg-[#F3F4F6] border-l-4 border-[#FF8C00] p-8 rounded-r-lg mt-4 shadow-sm">
      <h4 className="font-headline text-2xl font-bold text-[#2D2D2D] mb-2">Why I built this.</h4>
      <p className="font-body text-sm text-[#564334] leading-relaxed">
        I watched too many skilled contractors get stiffed after doing great work. The customer has all the power once the job is done. HammerCash flips that. You know the money is there before you start.
      </p>
      <p className="font-body text-sm text-[#564334] leading-relaxed mt-4">
        — Wade, Founder of HammerCash
      </p>
    </div>
  );
};

export default FounderSection;
