// src/components/CookieBanner.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    const loadMarketingContent = () => {
        document.querySelectorAll('iframe[data-src][data-cookie-category="marketing"]').forEach(iframe => {
            if (iframe.getAttribute('data-src')) {
                iframe.setAttribute('src', iframe.getAttribute('data-src'));
            }
        });
        // ... any other marketing script loading would go here
    };

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        } else if (consent === 'accepted') {
            loadMarketingContent();
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
        loadMarketingContent();
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div id="cookie-consent-banner" className="cookie-consent-banner active" role="dialog">
            <div className="container">
                <div className="cookie-banner-content">
                    <div className="cookie-text">
                        <h3 id="cookie-consent-title">Questo sito utilizza i cookie</h3>
                        <p id="cookie-consent-desc">Utilizziamo i cookie per analizzare il traffico e migliorare la tua esperienza. Non memorizziamo dati personali. <Link to="/privacy-policy">Leggi la nostra Privacy Policy</Link>.</p>
                    </div>
                    <div className="cookie-buttons">
                        <button id="cookie-decline-btn" className="btn btn-secondary" onClick={handleDecline}>Rifiuta</button>
                        <button id="cookie-accept-btn" className="btn btn-primary" onClick={handleAccept}>Accetta</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;