import React from 'react';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import HowItWorks from './HowItWorks';
import TrustSignalBar from './TrustSignalBar';
import Pricing from './Pricing';
import FounderSection from './FounderSection';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

function App() {
  return (
    <div className="light">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#2D2D2D] dark:bg-neutral-900 flex justify-between items-center px-8 py-4 max-w-full">
        <div className="flex items-center gap-3">
          <img src="/logo2.png" alt="HammerCash" className="h-12 w-auto" />
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
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <TrustSignalBar />
        <Pricing />
        <FounderSection />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
