import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { PageLoadProvider } from './contexts/PageLoadContext';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShowcasePage from './pages/ShowcasePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BlogsPage from './pages/BlogsPage';
import ArticlePage from './pages/ArticlePage';
import SnippetsPage from './pages/SnippetsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Note: GitHub Pages SPA routing is now handled in index.html before React loads
  
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
    <PageLoadProvider>
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
          {/* 404 Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </PageLoadProvider>
  );
}

export default App;
