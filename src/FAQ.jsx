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
          outline: 'none',
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
        question: "Where does the money go?",
        answer: "Your customer\'s payment is processed by Stripe and routed directly to your connected Stripe account. HammerCash never touches the funds."
      },
      {
        question: "Do you hold my customer\'s funds?",
        answer: "No. HammerCash does not hold, store, or control any funds. All payments are processed and routed by Stripe Connect."
      },
      {
        question: "What happens if the job is cancelled?",
        answer: "Cancellation and refund terms are agreed between you and your customer. Stripe handles any payment reversals according to their standard policies."
      },
      {
        question: "How do I receive my money?",
        answer: "Payments are deposited directly to your bank account through your connected Stripe account at each completed milestone."
      },
      {
        question: "How much does it cost?",
        answer: "HammerCash charges 3% only after your customer pays. There are no monthly fees and no upfront costs. Standard Stripe processing fees apply and are paid by the customer."
      },
      {
        question: "Do customers need an account?",
        answer: "No. Customers pay through a simple online checkout. No account or app required on their end."
      },
    ];

  return (
    <section id="faq" className="py-12 md:py-20 px-8 bg-white">
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
