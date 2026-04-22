import React from 'react';
import Hero from './Hero';
import ProblemSolution from './ProblemSolution';
import Testimonials from './Testimonials';
import HowItWorks from './HowItWorks';
// import TrustSignalBar from './TrustSignalBar';
import Pricing from './Pricing';
import FounderSection from './FounderSection';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import Modal from './Modal';
import useModal from './useModal';

function MainPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="light">
      <Modal isOpen={isOpen} closeModal={closeModal} />
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#2D2D2D] dark:bg-neutral-900 flex justify-between items-center px-8 py-4 max-w-full">
        <div className="flex items-center gap-3">
          <img src="/logo2.png" alt="HammerCash" className="h-10 md:h-12 w-auto" />
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <a
            className="font-headline text-white/80 hover-nav-glow uppercase tracking-wider text-sm font-semibold"
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            Services
          </a>
          <a className="font-headline text-white/80 hover-nav-glow uppercase tracking-wider text-sm font-semibold" href="#pricing">Pricing</a>
          <a className="font-headline text-white/80 hover-nav-glow uppercase tracking-wider text-sm font-semibold" href="#about">About</a>
          <a className="font-headline text-white/80 hover-nav-glow uppercase tracking-wider text-sm font-semibold" href="#footer">Contact</a>
        </div>
        <button
          onClick={openModal}
          className="bg-[#FF8C00] text-white border-none rounded-lg font-bold cursor-pointer text-[12px] py-2 px-3 md:text-[18px] md:py-4 md:px-8 hover-btn-glow">
          Get Started Free
        </button>
      </nav>

      <main className="pt-16">
        <button onClick={async () => {
          const response = await fetch('http://localhost:3001/api/stripe/connect', { method: 'POST' });
          const { url } = await response.json();
          window.location.href = url;
        }}>Connect with Stripe</button>
        <Hero openModal={openModal} />
        <ProblemSolution />
        <HowItWorks />
        <Testimonials />
        {/* <TrustSignalBar /> */}
        <Pricing openModal={openModal} />
        <FounderSection />
        <FAQ />
        <FinalCTA openModal={openModal} />
      </main>

      <Footer />
    </div>
  );
}

export default MainPage;