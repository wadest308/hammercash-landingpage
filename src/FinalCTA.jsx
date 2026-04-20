import React from 'react';

const FinalCTA = ({ openModal }) => {
  return (
    <section className="pt-12 md:pt-20 pb-8 px-8 bg-[#2D2D2D] text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="font-headline text-5xl md:text-7xl font-extrabold text-white">Ready to get paid what you're worth, when you're worth it?</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Start your next job with the money already secured.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={openModal}
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
            Get Started Free
          </button>
          <p className="text-white/60 text-sm mt-2">Free to sign up • Set up a job in 2 minutes.</p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
