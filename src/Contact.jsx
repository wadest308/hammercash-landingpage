import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <section className="bg-[#1e1e1e] min-h-screen font-body text-[#e5e5e5] py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="text-[#FF8C00] hover:underline font-bold">← Back to HammerCash</Link>
        </div>
        <div className="bg-[#2a2a2a] p-8 md:p-12 rounded-lg shadow-lg border border-neutral-700 max-w-2xl mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-neutral-400 mb-8">Have questions? We're here to help.</p>

          <div className="space-y-6 text-left">
            <div className="bg-[#1e1e1e] p-6 rounded-lg border border-neutral-700">
              <h2 className="font-headline text-xl font-bold text-[#FF8C00] mb-2">Company Information</h2>
              <p className="text-white">HammerCash Inc.</p>
              <p className="text-neutral-400">Calgary, AB, Canada</p>
            </div>

            <div className="bg-[#1e1e1e] p-6 rounded-lg border border-neutral-700">
              <h2 className="font-headline text-xl font-bold text-[#FF8C00] mb-2">Support & Inquiries</h2>
              <p className="text-neutral-400">Email us anytime and we'll get back to you within 24 hours.</p>
              <a href="mailto:wadelieu17@gmail.com" className="text-white hover:text-[#FF8C00] font-bold text-lg mt-2 block">
                wadelieu17@gmail.com
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
