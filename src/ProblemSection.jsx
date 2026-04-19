import React from 'react';

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-12">Still chasing payments after the job is done?</h2>
        <p className="text-lg text-gray-500 mt-4 mb-6">You do the work first. Then you hope to get paid.</p>
        
        <ul className="space-y-6 text-left max-w-2xl mx-auto">
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
            <p className="text-lg text-neutral-600">You finish the job and wait days or weeks</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
            <p className="text-lg text-neutral-600">Some customers delay or don't respond</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
            <p className="text-lg text-neutral-600">You take all the risk upfront</p>
          </li>
          <li className="flex items-start gap-4">
            <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
            <p className="text-lg text-neutral-600">One bad job can cost you thousands</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProblemSection;
