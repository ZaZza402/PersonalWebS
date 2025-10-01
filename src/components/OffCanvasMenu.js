// src/components/OffCanvasMenu.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const OffCanvasMenu = ({ isOpen, onCloseMenu }) => {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  // Close the main menu when any link is clicked
  const handleLinkClick = () => {
    onCloseMenu();
  };

  return (
    <>
      <nav className={`off-canvas-menu ${isOpen ? 'is-open' : ''}`}>
        <button className="menu-close" aria-label="Chiudi menu di navigazione" onClick={onCloseMenu}>
          <i className='bx bx-x'></i>
        </button>
        <NavLink to="/contact" className="btn btn-primary menu-cta" onClick={handleLinkClick}>
          Richiedi una Proposta
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/services" className="nav-link" onClick={handleLinkClick}>Servizi</NavLink></li>
          <li><NavLink to="/showcase" className="nav-link" onClick={handleLinkClick}>Portfolio</NavLink></li>
          <li 
            className="has-submenu" 
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            {/* The # href prevents the link from navigating, it's just a toggle */}
            <a href="#!" className="nav-link" onClick={(e) => { e.preventDefault(); setSubmenuOpen(!isSubmenuOpen); }}>
              Approfondimenti <i className='bx bxs-chevron-down'></i>
            </a>
            {/* We conditionally render the submenu based on its state */}
            {isSubmenuOpen && (
              <ul className="submenu" style={{ maxHeight: '200px' }}> {/* Style override to ensure it's visible */}
                <li><NavLink to="/blog" onClick={handleLinkClick}>Blog</NavLink></li>
                <li><NavLink to="/snippets" onClick={handleLinkClick}>Per Sviluppatori</NavLink></li>
              </ul>
            )}
          </li>
          <li><NavLink to="/contact" className="nav-link" onClick={handleLinkClick}>Contatti</NavLink></li>
        </ul>
        <div className="menu-logo-placeholder">
          <img src="/images/aw_logo.webp" alt="Logo AxiomWeb" />
        </div>
      </nav>
      {/* The overlay is part of the menu system */}
      <div className={`overlay ${isOpen ? 'is-active' : ''}`} onClick={onCloseMenu}></div>
    </>
  );
};

export default OffCanvasMenu;