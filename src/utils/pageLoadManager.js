// Simple page load manager to prevent layout shifts
export class PageLoadManager {
  static init() {
    // Enhanced layout shift prevention for mobile/slow devices
    if (this.shouldPreventLayoutShift()) {
      document.body.classList.add('page-loading', 'mobile-loading');
    }
    
    // Remove loading class after page is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.handlePageReady);
    } else {
      // If already loaded, handle immediately
      this.handlePageReady();
    }
  }
  
  static handlePageReady = () => {
    // Wait for React to render critical elements - enhanced detection
    if (this.shouldPreventLayoutShift()) {
      const delay = this.isMobileDevice() ? 300 : 200;
      setTimeout(() => {
        document.body.classList.remove('page-loading', 'mobile-loading');
      }, delay);
    }
  }

  static isMobileDevice() {
    // Check for mobile device using multiple indicators
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth <= 768 ||
      ('ontouchstart' in window) ||
      (window.DeviceMotionEvent !== undefined)
    );
  }

  // Enhanced mobile detection with viewport considerations
  static shouldPreventLayoutShift() {
    const isMobile = this.isMobileDevice();
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const isSlowConnection = navigator.connection && 
      (navigator.connection.effectiveType === 'slow-2g' || 
       navigator.connection.effectiveType === '2g' || 
       navigator.connection.effectiveType === '3g');
    
    return isMobile || isSlowDevice || isSlowConnection;
  }
}

// Initialize immediately when this module loads
if (typeof document !== 'undefined') {
  PageLoadManager.init();
}