import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Animated 404 Text */}
        <div className="error-code">
          <span className="digit">4</span>
          <span className="digit zero">0</span>
          <span className="digit">4</span>
        </div>

        {/* Error Message */}
        <h1 className="error-title">Pagina Non Trovata</h1>
        <p className="error-description">
          Sembra che la pagina che stai cercando non esista più o sia stata spostata.
          Non preoccuparti, succede anche ai migliori sviluppatori!
        </p>

        {/* Action Buttons */}
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">
            <i className='bx bx-home'></i>
            Torna alla Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-secondary"
          >
            <i className='bx bx-arrow-back'></i>
            Torna Indietro
          </button>
        </div>

        {/* Auto-redirect Countdown */}
        <div className="countdown-container">
          <p className="countdown-text">
            Reindirizzamento automatico alla home tra{' '}
            <span className="countdown-number">{countdown}</span> secondi
          </p>
          <div className="countdown-progress">
            <div 
              className="countdown-bar" 
              style={{ width: `${(10 - countdown) * 10}%` }}
            ></div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="floating-elements">
          <div className="floating-code">{'</>'}</div>
          <div className="floating-code">{'{ }'}</div>
          <div className="floating-code">{'[ ]'}</div>
          <div className="floating-binary">01010101</div>
          <div className="floating-binary">11001100</div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;