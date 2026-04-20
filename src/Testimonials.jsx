import React from 'react';

const testimonials = [
  {
    quote: "HammerCash changed the game for me. Getting paid upfront means I can focus on the work, not chasing invoices. It's a huge weight off my shoulders.",
    name: 'Frankie D.',
    trade: 'General Contractor',
  },
  {
    quote: "As a solo electrician, cash flow is everything. With HammerCash, I know the money is there before I even start. I'll never go back to the old way.",
    name: 'Maria G.',
    trade: 'Electrician',
  },
  {
    quote: "The 3% fee is nothing compared to the peace of mind I get. Knowing I'm not going to get stiffed on a big job is priceless. Highly recommend.",
    name: 'David L.',
    trade: 'Plumber',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#1e1e1e] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">What Contractors Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#2d2d2d] p-8 rounded-lg">
              <p className="text-white/80 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-[#f5a623]">{testimonial.trade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
