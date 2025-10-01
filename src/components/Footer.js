// src/components/Footer.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Replicates the dynamic copyright year from script.js
    const [year, setYear] = React.useState(new Date().getFullYear());

    useEffect(() => {
        // This is just to ensure it updates if the component stays mounted over a year change, though unlikely.
        setYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="main-footer">
      <div className="container">
        <p className="footer-quote"><em>"Il design non è solo come appare e come si sente. Il design è come funziona."</em></p>
        <div className="footer-links">
          <h4>Link Veloci</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Servizi</Link></li>
            <li><Link to="/contact">Contatti</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/AxiomWeb/" aria-label="Visita la nostra pagina Facebook" target="_blank" rel="noopener noreferrer"><i className='bx bxl-facebook-square'></i></a>
          <a href="/contact" aria-label="Contattaci per LinkedIn"><i className='bx bxl-linkedin-square'></i></a>
          <a href="/contact" aria-label="Contattaci per Instagram"><i className='bx bxl-instagram-alt'></i></a>
        </div>
        {/* The dynamic year is rendered here */}
        <div className="footer-copyright">© {year} AxiomWeb. Tutti i diritti riservati.</div>
      </div>
    </footer>
  );
};

export default Footer;