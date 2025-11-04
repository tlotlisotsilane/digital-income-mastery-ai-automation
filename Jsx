import React, { useEffect, useState } from 'react';

const ORIGINAL_PRICE = 100.0;
const DISCOUNT_PERCENT = 12;
const DISCOUNT_END_DATE = new Date('2025-12-31T23:59:59+02:00'); // inclusive
const WHOP_CHECKOUT_URL = 'https://whop.com/products/YOUR_PRODUCT_ID'; // <<-- Replace this

function formatMoney(x) {
  return x.toFixed(2);
}

export default function App() {
  const [now, setNow] = useState(new Date());
  const [discounted, setDiscounted] = useState(false);
  const [countdownText, setCountdownText] = useState('');

  useEffect(() => {
    const check = () => {
      const n = new Date();
      setNow(n);
      setDiscounted(n <= DISCOUNT_END_DATE);
      updateCountdown();
    };
    const timer = setInterval(check, 1000 * 60); // update every minute
    check();
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  function updateCountdown() {
    const diff = DISCOUNT_END_DATE - new Date();
    if (diff <= 0) {
      setCountdownText('Discount ended');
      setDiscounted(false);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    setCountdownText(`${days}d ${hours}h ${mins}m`);
  }

  const price = discounted ? ORIGINAL_PRICE * (1 - DISCOUNT_PERCENT / 100) : ORIGINAL_PRICE;

  function openCheckout() {
    if (!WHOP_CHECKOUT_URL || WHOP_CHECKOUT_URL.includes('YOUR_PRODUCT_ID')) {
      alert('Please set WHOP_CHECKOUT_URL in App.jsx to your Whop checkout link.');
      return;
    }
    window.open(WHOP_CHECKOUT_URL, '_blank');
  }

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="logo">DIM</div>
          <div className="brand-text">
            <h1>Digital Income Mastery</h1>
            <div className="subtitle">AI & Automation — Build passive income with AI</div>
          </div>
        </div>
        <div className="price-tag">
          <div className="price-main">${formatMoney(price)}</div>
          {discounted && <div className="badge">-{DISCOUNT_PERCENT}% till Dec 31</div>}
        </div>
      </header>

      <main className="container">
        <section className="hero card">
          <div className="left">
            <h2>Master AI & Automation to create income streams</h2>
            <p className="lead">
              Practical lessons, templates and automations you can implement right away.
            </p>

            <div className="cta-row">
              <button className="btn primary" onClick={openCheckout}>
                Enroll Now — ${formatMoney(price)}
              </button>
              <button
                className="btn ghost"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              >
                View Modules
              </button>
            </div>

            <div className="extra">
              {discounted ? (
                <div className="discount">
                  <div>Original: <span className="orig">${formatMoney(ORIGINAL_PRICE)}</span></div>
                  <div>Discounted: <strong>${formatMoney(price)}</strong></div>
                  <div className="countdown">Ends in: {countdownText}</div>
                </div>
              ) : (
                <div className="no-discount">Price: ${formatMoney(ORIGINAL_PRICE)}</div>
              )}
            </div>
          </div>

          <div className="right card-compact">
            <h3>Course Modules</h3>
            <ol className="modules">
              <li><strong>AI Mindset & Foundation</strong> — orientation & tools</li>
              <li><strong>AI Content Creation System</strong> — scripts & repurposing</li>
              <li><strong>AI Marketing & Sales Automation</strong> — funnels & automations</li>
              <li><strong>AI Business Operations</strong> — SOPs & workflows</li>
              <li><strong>Advanced AI Income Streams</strong> — scaling & leverage</li>
              <li><strong>AI Monetisation</strong> — pricing & offers</li>
              <li><strong>E-commerce</strong> — AI for stores & productization</li>
            </ol>
            <div style={{ marginTop: 12 }}>
              <button className="btn primary block" onClick={openCheckout}>
                Buy — ${formatMoney(price)}
              </button>
            </div>
          </div>
        </section>

        <section className="card details">
          <h3>What's included</h3>
          <ul>
            <li>Video lessons + downloadable PDFs</li>
            <li>Templates, scripts and SOPs</li>
            <li>Lifetime access & updates</li>
            <li>14-day money-back guarantee</li>
          </ul>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Digital Income Mastery • Built with 💙 & gold
        </footer>
      </main>
    </div>
  );
}
