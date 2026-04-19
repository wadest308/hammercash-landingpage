import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
