import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShowcasePage from './pages/ShowcasePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BlogsPage from './pages/BlogsPage';
import ArticlePage from './pages/ArticlePage';
import SnippetsPage from './pages/SnippetsPage';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // GitHub Pages SPA compatibility - handles redirect from 404.html
  useEffect(() => {
    // This runs once on app initialization to handle GitHub Pages routing
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('p')) {
      const route = urlParams.get('p');
      window.history.replaceState(null, null, route + window.location.hash);
    }
  }, []);
  
  useEffect(() => {
    handleCloseMenu();
  }, [location]);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  
  const handleCloseMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <Layout isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} handleCloseMenu={handleCloseMenu}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/snippets" element={<SnippetsPage />} />
        {/* Legacy routes for backwards compatibility */}
        <Route path="/ai-guides" element={<BlogsPage />} />
        <Route path="/ai-guides/:slug" element={<ArticlePage />} />
        <Route path="/case-studies" element={<SnippetsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
