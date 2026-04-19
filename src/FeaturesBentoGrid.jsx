import React from 'react';

const FeaturesBentoGrid = () => {
  return (
    <section id="problem" className="py-12 md:py-32 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4">
          <span className="bg-[#FF8C00] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">The Tradesman’s Trap.</span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D]">Sound Familiar?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Feature 1 */}
          <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-xl shadow-sm flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="material-symbols-outlined text-[#FF8C00] text-5xl mb-6">precision_manufacturing</span>
              <h3 className="font-headline text-3xl font-bold mb-4 text-[#2D2D2D]">Stop Being a Debt Collector.</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Customers delay, ignore, or go quiet after the work is done.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="md:col-span-4 bg-secondary text-white p-10 rounded-xl flex flex-col justify-center">
            <span className="material-symbols-outlined text-[#FF8C00] text-6xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
            <h3 className="font-headline text-2xl font-bold mb-4">End the Free Lending.</h3>
            <p className="text-blue-100 text-lg leading-relaxed">You buy the materials, do the work, and hope they pay. One bad client can wipe your margin.</p>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-4 bg-surface-container-high p-10 rounded-xl border border-outline-variant/15">
            <span className="material-symbols-outlined text-[#FF8C00] text-5xl mb-6">architecture</span>
            <h3 className="font-headline text-2xl font-bold mb-4 text-[#2D2D2D]">No Protection Before You Start.</h3>
            <p className="text-on-surface-variant leading-relaxed">Nothing secures your payment before the job begins. You have no leverage if something goes wrong.</p>
          </div>

          {/* Feature 4 */}
          <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-xl shadow-sm flex items-center gap-12 overflow-hidden">
            <div className="flex-1">
              <h3 className="font-headline text-3xl font-bold mb-4 text-[#2D2D2D]">Money Secured Before You Start.</h3>
              <p className="text-on-surface-variant text-lg">Funds secured upfront. Automatic milestone payments. No more chasing or guessing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBentoGrid;
