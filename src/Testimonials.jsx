import React from 'react';

const testimonials = [
  {
    quote: "I used HammerCash on a $8,400 deck build. Customer paid before I ordered a single board. No awkward conversations, no chasing — money hit my account the day we finished.",
    name: 'Mike R.',
    trade: 'General Contractor, Texas',
  },
  {
    quote: "First job I ran through HammerCash was a $5,200 bathroom reno. Customer paid online in 2 minutes. I didn\'t have to ask twice.",
    name: 'James T.',
    trade: 'Renovation Contractor',
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
