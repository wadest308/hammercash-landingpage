import React from 'react';

function App() {
  return (
    <div className="light">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#2D2D2D] dark:bg-neutral-900 flex justify-between items-center px-8 py-4 max-w-full">
        <div className="flex items-center gap-3">
          <img src="/logo 2.png" alt="HammerCash" className="h-12 w-auto" />
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <a 
            className="font-headline text-white border-b-2 border-[#FF8C00] pb-1 uppercase tracking-wider text-sm font-semibold" 
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Services
          </a>
          <a className="font-headline text-white/80 hover:text-white transition-colors duration-200 uppercase tracking-wider text-sm font-semibold" href="#pricing">Packages</a>
          <a className="font-headline text-white/80 hover:text-white transition-colors duration-200 uppercase tracking-wider text-sm font-semibold" href="#about">About</a>
          <a className="font-headline text-white/80 hover:text-white transition-colors duration-200 uppercase tracking-wider text-sm font-semibold" href="#footer">Contact</a>
        </div>
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
          GET STARTED FREE
        </button>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
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
              <img src="/logo 2.png" alt="HammerCash Logo" className="w-80 h-auto mb-8" />
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] -tracking-[0.02em]">
                Still Chasing Clients <br/><span className="text-[#FF8C00]">for Money?</span>
              </h1>
              <div className="text-white/80 text-lg leading-relaxed max-w-xl space-y-4">
                <p>
                  <strong className="text-[#FF8C00]">Stop waiting weeks.</strong> Get paid the moment you finish work.
                </p>
                <p>
                  <strong className="text-[#FF8C00]">No more ghosting.</strong> Stop chasing clients who ignore your invoices.
                </p>
                <p>
                  <strong className="text-[#FF8C00]">Protect your profit.</strong> Don't let one bad client ruin you.
                </p>
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
                  GET STARTED FREE
                </button>
                <button 
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-lg font-headline font-bold text-lg hover:bg-white/20 transition-all"
                >
                  See How It Works.
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
                  <div className="text-neutral-500 text-sm font-medium">Contractor: <span className="text-[#2D2D2D]">Wade Digital</span></div>
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

        {/* Trust Signal Bar */}
        <section id="about" className="py-12 px-8 bg-white border-y border-[#ddc1ae]/30">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80">
              <div className="flex items-center gap-2">
                <img 
                  src="https://m.bbb.org/brand/logos/BBB_PrimaryLogo_Blue_RGB.svg" 
                  alt="Better Business Bureau" 
                  className="h-10 w-auto brightness-0 invert opacity-80"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-[#0084FF]">payments</span>
                <span className="font-headline font-bold text-xl text-[#2D2D2D]">Interac</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-[#635BFF]">credit_card</span>
                <span className="font-headline font-bold text-xl text-[#2D2D2D]">Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-[#4CAF50]">lock</span>
                <span className="font-headline font-bold text-xl text-[#2D2D2D]">SSL Secured</span>
              </div>
            </div>
            <p className="text-[#564334]/60 font-medium text-sm text-center uppercase tracking-widest">
              Trusted by HVAC technicians, plumbers, and electricians across Canada
            </p>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="problem" className="py-32 px-8 bg-surface">
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
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-tighter">Certified ISO 27001</span>
                  <span className="text-xs font-bold uppercase tracking-tighter">GDPR Compliant</span>
                </div>
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

        {/* Stats Section */}
        <section id="how-it-works" className="bg-[#2D2D2D] py-32 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-headline text-white text-5xl md:text-6xl font-extrabold leading-tight">
                HOW IT WORKS. <span className="text-[#FF8C00]">Get Paid As You Build.</span>
              </h2>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <div className="text-[#FF8C00] text-5xl font-extrabold font-headline">3%</div>
                <p className="text-white font-headline uppercase tracking-widest text-xs font-bold">Per transaction. Nothing else.</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#FF8C00] text-5xl font-extrabold font-headline">$0</div>
                <p className="text-white font-headline uppercase tracking-widest text-xs font-bold">Monthly fees.</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#FF8C00] text-5xl font-extrabold font-headline">100%</div>
                <p className="text-white font-headline uppercase tracking-widest text-xs font-bold">Secure and protected on every job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-32 px-8 bg-[#FFFFFF]" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="bg-[#FF8C00] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">PRICING.</span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mt-4">Simple Pricing.</h2>
              <p className="text-[#564334] text-lg max-w-2xl mx-auto">No monthly fees. You only pay when you get paid.</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="bg-white p-12 md:p-16 rounded-3xl border border-[#ddc1ae] flex flex-col shadow-xl max-w-3xl text-center items-center">
                <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-[#2D2D2D] mb-6">Pay As You Go.</h3>
                <p className="text-[#564334] text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                  We take 3% only when a job is paid. Free to start.
                </p>
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
                  GET STARTED FREE
                </button>
                <p className="text-[#564334] font-medium text-sm flex items-center gap-2">
                  <span className="text-[#FF8C00]">✅</span> You only pay when you get paid.
                </p>
              </div>
              
              <div className="w-full max-w-3xl bg-[#F3F4F6] border-l-4 border-[#005288] p-4 rounded-r-lg mt-4 shadow-sm">
                <p className="font-body text-sm text-[#564334] leading-relaxed">
                  <span className="font-semibold text-[#2D2D2D]">"Finally a way to not worry about getting paid."</span><br/> — Local Contractor, Calgary AB.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Canvas */}
        <section className="py-40 px-8 bg-surface-container-low text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-[#2D2D2D]">Ready to Stop Chasing Payments?</h2>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Start your next job with the money already secured.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
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
                GET STARTED FREE
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-[#2D2D2D] w-full py-12 flex flex-col md:flex-row justify-between items-center px-12">
        <div className="flex flex-col gap-4 items-center md:items-start mb-8 md:mb-0">
          <div className="text-white text-lg font-bold font-headline">HammerCash</div>
          <p className="font-body text-sm leading-relaxed max-w-xs text-center md:text-left text-white">
            Get paid faster. Work with confidence.
          </p>
          <span className="font-body text-white/70 text-sm leading-relaxed">© 2026 HammerCash. Calgary, AB.</span>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Company</span>
            <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="#">Privacy Policy</a>
            <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="#">Terms of Service</a>
            <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="#">Contact Us</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Social</span>
            <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="#">LinkedIn</a>
            <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
