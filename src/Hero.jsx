import React from 'react';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-[921px] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          alt="Professional HVAC technician working on a commercial ventilation system"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt8N8Yl_WJ3lQWqQjWvY-Q-0H6qL-q8L-q8L-q8L-q8L-q8L-q8L-q8L-q8L-q8L-q8L-q8L-q"
        />
      </div>
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-8">
          
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] -tracking-[0.02em]">
            Get Paid <span style={{ color: '#FF8C00' }}>Before You Start</span> the Job.
          </h1>
          <div className="text-white/80 text-lg leading-relaxed max-w-xl space-y-4">
            <p>Stop guessing if you'll get paid. Lock it in first.</p>
            <ul className="text-white text-lg space-y-2">
              <li className="flex items-center gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Finish jobs without worrying about payment</li>
              <li className="flex items-center gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Customers fund the job before you begin</li>
              <li className="flex items-center gap-2"><span style={{ color: '#FF8C00' }}>✓</span> Get paid step by step as work is completed</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              data-tally-open="D4vAdq"
              data-tally-layout="modal"
              data-tally-width="500"
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
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-lg font-headline font-bold text-lg hover:bg-white/20 transition-all"
            >
              How It Works
            </button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative max-w-md mx-auto border border-neutral-100">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                PAID
              </div>
              <div className="text-neutral-300">
                <span className="material-symbols-outlined">more_horiz</span>
              </div>
            </div>
            <div className="space-y-1 mb-8 text-left">
              <div className="text-4xl font-extrabold text-[#2D2D2D] font-headline tracking-tight">$4,250.00</div>
              <div className="text-lg font-semibold text-[#2D2D2D]">Furnace Installation</div>
              <div className="text-neutral-500 text-sm font-medium">Contractor: <span className="text-[#2D2D2D]">HammerCash</span></div>
            </div>
            <div className="space-y-3 mb-10">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
                <span>Progress</span>
                <span className="text-emerald-600">3 of 3 milestones complete</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full w-full shadow-sm shadow-emerald-200"></div>
              </div>
            </div>
            <div className="pt-6 border-t border-neutral-100">
              <div className="inline-flex items-center gap-2 bg-[#FF8C00]/10 text-[#904d00] px-4 py-2.5 rounded-full text-sm font-bold">
                <span className="text-[#FF8C00]">✅</span>
                99.9% Payment Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
