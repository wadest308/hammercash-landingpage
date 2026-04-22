import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#2D2D2D] w-full py-12 flex flex-col md:flex-row justify-between items-center px-12">
      <div className="flex flex-col gap-4 items-center md:items-start mb-8 md:mb-0">
        <div className="text-white text-lg font-bold font-headline">HammerCash Inc.</div>
        <p className="font-body text-sm leading-relaxed max-w-sm text-center md:text-left text-white/80">
          HammerCash is a software platform that facilitates payments between customers and contractors using Stripe Connect. HammerCash does not act as a bank, escrow service, or financial institution. We do not hold, store, or control contractor funds. All payments are processed securely by Stripe.
        </p>
        <div className="font-body text-white/60 text-sm leading-relaxed mt-2">
          <p>Calgary, AB, Canada</p>
          <p>support@hammercash.com</p>
          <p className="mt-4">© 2026 HammerCash Inc.</p>
        </div>
      </div>
      <div className="flex gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Company</span>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="/privacy-policy">Privacy Policy</a>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="/terms">Terms of Service</a>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="/refund-policy">Refund Policy</a>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="/contact">Contact Us</a>

          <p className="text-white/70 text-sm mt-4">Questions? Email us at wadelieu17@gmail.com</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-white font-bold text-xs uppercase tracking-widest mb-2">Social</span>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-white hover:text-[#005288] transition-all font-body text-sm" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
