// src/components/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component's sole purpose is to scroll the window to the top on every route change.
const ScrollToTop = () => {
  // The useLocation hook returns the location object that represents the current URL.
  const { pathname } = useLocation();

  // The useEffect hook will run every time the 'pathname' changes.
  useEffect(() => {
    // This is the browser's built-in function to scroll to the top-left corner.
    window.scrollTo(0, 0);
  }, [pathname]); // The dependency array ensures this effect runs ONLY when the URL path changes.

  // This component does not render any visible HTML, it's purely for functionality.
  return null;
};

export default ScrollToTop;