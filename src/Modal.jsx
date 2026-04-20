import React, { useState } from 'react';

const Modal = ({ isOpen, closeModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trade, setTrade] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('trade', trade);

    fetch('https://formspree.io/f/mvzdqkny', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          closeModal();
          setIsSubmitted(false);
        }, 3000);
      } else {
        // Handle error
      }
    }).catch(error => {
      // Handle error
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        maxWidth: '500px',
        padding: '40px',
        borderRadius: '8px',
        position: 'relative',
      }}>
        <button onClick={closeModal} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
        }}>
          &times;
        </button>
        {isSubmitted ? (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontWeight: 'bold' }}>You are on the list. We will be in touch soon.</h3>
          </div>
        ) : (
          <>
            <h3 style={{
              fontWeight: 'bold',
              fontSize: '28px',
              color: '#2D2D2D',
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              Get Early Access — It's Free
            </h3>
            <p style={{
              color: 'grey',
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '32px',
            }}>
              Free to join. We will reach out to get you set up.
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid grey',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid grey',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label htmlFor="trade" style={{ display: 'block', marginBottom: '8px' }}>What is your trade</label>
                <select
                  id="trade"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid grey',
                    borderRadius: '4px',
                  }}
                >
                  <option value="">Select your trade</option>
                  <option value="HVAC Technician">HVAC Technician</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="General Contractor">General Contractor</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#FF8C00',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
              }}>
                Get Started Free
              </button>
              <p style={{
                fontSize: '12px',
                textAlign: 'center',
                marginTop: '16px',
              }}>
                Free to join. No credit card required.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
