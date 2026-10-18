import React, { useState, useEffect } from 'react';
import { quotes } from '../../data/quotes';
import '../../styles.css';

export default function QuoteCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // once yumusak olarak karartma efekti icin state tetiklenir
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFade(true); // yeni alinti gelince tekrar gorunur yap
      }, 300); // 300ms gecis suresi
    }, 7000); // 7 saniyede bir degistirir

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentIndex];

  return (
    <div className="quote-card-container" style={{
      padding: '20px',
      borderRadius: '12px',
      backgroundColor: '#f9f9fb',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      margin: '20px 0',
      textAlign: 'center',
      borderLeft: '4px solid #6366f1',
      transition: 'opacity 0.3s ease-in-out',
      opacity: fade ? 1 : 0
    }}>
      <h3 style={{ fontSize: '14px', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
        Kendine Bir Sayfa Ayır
      </h3>
      <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#333', marginBottom: '12px' }}>
        "{currentQuote.quote}"
      </p>
      <div style={{ fontSize: '13px', color: '#666' }}>
        <strong>{currentQuote.book}</strong> — <span>{currentQuote.author}</span>
      </div>
    </div>
  );
}