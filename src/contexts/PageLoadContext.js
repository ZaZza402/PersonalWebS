import React, { createContext, useContext, useState, useEffect } from 'react';

const PageLoadContext = createContext();

export const usePageLoad = () => {
  const context = useContext(PageLoadContext);
  if (!context) {
    throw new Error('usePageLoad must be used within a PageLoadProvider');
  }
  return context;
};

export const PageLoadProvider = ({ children }) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Wait for critical resources to load
    const handleLoad = () => {
      // Small delay to ensure DOM is fully ready
      setTimeout(() => {
        setIsPageLoaded(true);
        // After first load, subsequent navigations don't need the delay
        setTimeout(() => setIsInitialLoad(false), 1000);
      }, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <PageLoadContext.Provider value={{ isPageLoaded, isInitialLoad }}>
      {children}
    </PageLoadContext.Provider>
  );
};