import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: '600',
          color: '#2D2D2D',
        }}
      >
        {question}
        <span style={{ color: '#FF8C00', fontSize: '20px' }}>
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && (
        <p style={{ marginTop: '8px', color: '#6b7280', lineHeight: '1.6' }}>
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How does this work?",
      answer: "You create a job, your customer pays, and you get paid as the work is completed."
    },
    {
      question: "Where does the money go?",
      answer: "Payments are handled securely through Stripe and held until they are released."
    },
    {
      question: "Do I get paid before starting?",
      answer: "Yes. The job is funded before you begin so you know the money is there."
    },
    {
      question: "What if there is a problem?",
      answer: "Payments can be paused and reviewed so things stay fair."
    },
    {
      question: "How much does it cost?",
      answer: "3% when you get paid, plus standard processing fees."
    },
    {
      question: "Do customers need an account?",
      answer: "No. They can review the job and pay without signing up."
    },
    {
      question: "Is this safe?",
      answer: "Yes. Stripe handles all payments securely."
    },
    {
      question: "Can I use this anywhere?",
      answer: "Yes. It works for contractors anywhere."
    }
  ];

  return (
    <section id="faq" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#2D2D2D] mb-12">
          Frequently Asked Questions
        </h2>
        <div className="text-left">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
