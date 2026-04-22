import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="hover-faq-glow" style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 0' }}>
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
        answer: "HammerCash never touches your funds. Your customer's payment is processed by Stripe and routed directly to your connected Stripe account."
      },
      {
        question: "Are you an escrow service?",
        answer: "No. HammerCash is a software platform. We do not act as a bank, escrow service, or financial institution. We do not hold or manage your funds. Payments are processed securely via Stripe Connect."
      },
      {
        question: "Who handles disputes or refunds?",
        answer: "Contractors and customers define their own agreements. HammerCash does not mediate disputes. All refunds and disputes must be handled directly between the contractor and the customer, and are subject to Stripe's standard policies."
      },
      {
        question: "What happens if the job is cancelled?",
        answer: "Cancellation terms are agreed between you and your customer. Stripe handles any payment reversals according to their standard policies. HammerCash does not issue refunds."
      },
      {
        question: "How do I receive my money?",
        answer: "Payments deposit directly to your bank account through your connected Stripe account at each completed milestone."
      },
      {
        question: "How much does it cost?",
        answer: "HammerCash charges a 3% platform fee which is deducted from each payment automatically through Stripe after your customer pays. Stripe's standard card processing fees are separate and also apply to every transaction."
      },
      {
        question: "Do customers need an account?",
        answer: "No. Customers pay through a simple online checkout link. No app or account required."
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
