// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import OffCanvasMenu from './OffCanvasMenu';
import CookieBanner from './CookieBanner';
import FloatingWhatsAppButton from './FloatingWhatsAppButton'; // <-- 1. IMPORT our new component

const Layout = ({ children, isMenuOpen, handleMenuToggle, handleCloseMenu }) => {
  return (
    <>
      <Header onMenuToggle={handleMenuToggle} />
      <OffCanvasMenu isOpen={isMenuOpen} onCloseMenu={handleCloseMenu} />
      
      <main id="main-content">{children}</main>
      
      <Footer />
      <CookieBanner />
      
      {/* 2. The old <a> tag is GONE. We now use our new component. */}
      <FloatingWhatsAppButton
        phoneNumber="390694428189"
        ariaLabel="Chatta su WhatsApp"
      />
    </>
  );
};

export default Layout;