// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo'; // <-- 1. IMPORT our new component

const Header = ({ onMenuToggle }) => {
  return (
    <header className="main-header">
      <Link to="/" className="logo-link">
        {/* 2. REPLACE the old div with our new animated component */}
        <AnimatedLogo />
      </Link>
      <button className="menu-toggle" aria-label="Apri menu di navigazione" onClick={onMenuToggle}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </header>
  );
};

export default Header;