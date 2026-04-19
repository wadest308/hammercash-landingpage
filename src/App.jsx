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
          className="bg-[#FF8C00] text-white border-none rounded-lg font-bold cursor-pointer text-[13px] py-2 px-3.5 md:text-[18px] md:py-4 md:px-8">
          Secure My Next Job
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
                Get Paid Before You Start the Job.
              </h1>
              <div className="text-white/80 text-lg leading-relaxed max-w-xl space-y-4">
                <p>Stop chasing invoices and taking all the risk. Secure customer payments upfront in escrow and get paid automatically as you hit milestones.</p>
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
                  Secure My Next Job
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

        {/* The Problem Section */}
        <section id="problem" className="py-20 px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-12">The Contractor's Gamble</h2>
                <ul className="space-y-6 text-left max-w-2xl mx-auto">
                    <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
                        <p className="text-lg text-neutral-600">You finish the job, but the check is always "in the mail."</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
                        <p className="text-lg text-neutral-600">You're a contractor, not a debt collector. But here you are, chasing another invoice.</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
                        <p className="text-lg text-neutral-600">You pay for materials and labor upfront, while your client holds all the cards.</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl mt-1">cancel</span>
                        <p className="text-lg text-neutral-600">That "one bad client" who disappears can wipe out your entire profit for the month.</p>
                    </li>
                </ul>
                <p className="text-2xl font-bold text-[#2D2D2D] mt-16">It doesn't have to be this way.</p>
            </div>
        </section>

        {/* Trust Signal Bar */}
        <section id="about" className="py-12 px-8 bg-white border-y border-[#ddc1ae]/30">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
            <div className="grid grid-cols-2 gap-8 md:flex md:flex-wrap md:justify-center md:items-center md:gap-12 lg:gap-20 opacity-80">
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
              Built for Canadian trade contractors — HVAC, plumbers, and electricians.
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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-8 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-20">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 border border-gray-200">
                  <span className="font-headline text-3xl font-bold text-[#2D2D2D]">1</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Create Job</h3>
                <p className="text-neutral-500 leading-relaxed">Set up your project and payment milestones in just a few clicks.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 border border-gray-200">
                  <span className="font-headline text-3xl font-bold text-[#2D2D2D]">2</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Customer Funds Project</h3>
                <p className="text-neutral-500 leading-relaxed">Your customer pays the full amount into a secure account before you start.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6 border border-gray-200">
                  <span className="font-headline text-3xl font-bold text-[#2D2D2D]">3</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Get Paid In Milestones</h3>
                <p className="text-neutral-500 leading-relaxed">As you finish each stage of the job, the funds are released directly to your bank.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example Section */}
        <section id="real-example" className="py-32 px-8 bg-white pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D]">
                A Real-World Example
              </h2>
              <p className="text-lg text-neutral-500 mt-4">Here's how a typical $10,000 job is broken down and paid out.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Total Job Cost</h3>
                <span className="text-3xl font-extrabold text-[#2D2D2D]">$10,000</span>
              </div>
              <ul className="space-y-6">
                <li className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-[#2D2D2D]">Deposit (25%)</h4>
                    <p className="text-neutral-500">Paid upfront before work begins. This covers your initial material costs.</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">$2,500</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-[#2D2D2D]">Mid-Project (50%)</h4>
                    <p className="text-neutral-500">Released after the main structure is complete and approved by the homeowner.</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">$5,000</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-[#2D2D2D]">Final Payment (25%)</h4>
                    <p className="text-neutral-500">The final amount is paid once the job is 100% complete and the customer is satisfied.</p>
                  </div>
                  <span className="text-xl font-bold text-green-600">$2,500</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Trust & Security Section */}
        <section id="trust-security" className="py-32 px-8 bg-gray-50 pt-16 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-12">
              Your Money is Safe and Secure
            </h2>
            <ul className="space-y-8 text-left max-w-3xl mx-auto">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Funds Secured Upfront</h3>
                  <p className="text-neutral-600">We verify and hold the full project payment from the customer before you even think about loading up your truck.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Fair Milestone Releases</h3>
                  <p className="text-neutral-600">You get paid as you complete each stage of the work. The customer has to approve the release, ensuring fairness for both sides.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#FF8C00] text-3xl mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Ironclad Protection</h3>
                  <p className="text-neutral-600">We protect both the contractor and the customer with a clear and fair dispute resolution process.</p>
                </div>
              </li>
            </ul>
            <p className="text-2xl font-bold text-[#2D2D2D] mt-16">With us, you can finally work with confidence.</p>
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
                  We take 3% when a job is paid. No monthly fees. Free to start.
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
                  Secure My Next Job
                </button>
                <p className="text-[#564334] font-medium text-sm">
                  You only pay when you get paid. 3% per job — that is it.
                </p>
              </div>
              
              <div className="w-full max-w-3xl bg-[#F3F4F6] border-l-4 border-[#005288] p-4 rounded-r-lg mt-4 shadow-sm">
                <p className="font-body text-sm text-[#564334] leading-relaxed">
                  <span className="font-semibold text-[#2D2D2D]">"Finally a way to not worry about getting paid."</span><br/> — Mike T. — HVAC Contractor, Calgary AB
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="py-40 px-8 bg-[#2D2D2D] text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-white">Ready to get paid what you're worth, when you're worth it?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join the contractors who never chase a payment again.
            </p>
            <div className="flex flex-col items-center gap-4">
              <button 
                data-tally-open="D4vAdq" 
                data-tally-layout="modal" 
                data-tally-width="500" 
                style={{
                  backgroundColor: '#FF8C00',
                  color: 'white',
                  border: 'none',
                  padding: '20px 40px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '24px',
                  boxShadow: '0 10px 30px -10px #FF8C00'
                }}>
                Secure My Next Job
              </button>
              <p className="text-white/60 text-sm mt-2">Free to sign up • Set up a job in 2 minutes.</p>
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