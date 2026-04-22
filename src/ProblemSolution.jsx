import React from 'react';

const ProblemSolution = () => {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
        
        {/* Problem Card */}
        <div className="flex-1 p-8 rounded-xl border border-gray-200 bg-white shadow-sm transition-all">
          <h3 className="font-headline text-2xl font-bold text-[#2D2D2D] mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-red-500 text-3xl">cancel</span>
            The Problem
          </h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-xl mt-1">cancel</span>
              <p className="text-neutral-600 leading-relaxed"><strong>Financial Risk:</strong> You take all the risk upfront, and one bad customer can cost you thousands in unpaid labor and materials.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-xl mt-1">cancel</span>
              <p className="text-neutral-600 leading-relaxed"><strong>Ghosting:</strong> Customers delay payments, go quiet, or simply refuse to pay once the hard work is already done.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-xl mt-1">cancel</span>
              <p className="text-neutral-600 leading-relaxed"><strong>Wasted Time:</strong> You finish the job but have to wait days or weeks, wasting hours manually chasing down your money.</p>
            </li>
          </ul>
        </div>

        {/* Solution Card */}
        <div className="flex-1 p-8 md:p-10 rounded-xl border-2 border-green-100 bg-white shadow-[0_8px_30px_rgb(34,197,94,0.12)] relative overflow-hidden transform md:-translate-y-2 transition-all">
          {/* Subtle background glow effects */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-60"></div>
          
          <h3 className="font-headline text-2xl font-bold text-[#FF8C00] mb-6 flex items-center gap-3 relative z-10">
            <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
            The Solution
          </h3>
          <ul className="space-y-6 relative z-10">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-500 text-xl mt-1">check_circle</span>
              <p className="text-neutral-700 leading-relaxed"><strong>Guaranteed Funds:</strong> Customers secure the full project amount in escrow before you even step foot on the job site.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-500 text-xl mt-1">check_circle</span>
              <p className="text-neutral-700 leading-relaxed"><strong>Automation:</strong> Get paid automatically as each milestone is completed—no more creating invoices or chasing clients.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-green-500 text-xl mt-1">check_circle</span>
              <p className="text-neutral-700 leading-relaxed"><strong>Zero Risk:</strong> Start every project with total peace of mind, knowing the money is already there waiting for you.</p>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;
