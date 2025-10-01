// Simple page load manager to prevent layout shifts
export class PageLoadManager {
  static init() {
    // TEMPORARILY DISABLED - Add loading class immediately
    // document.body.classList.add('page-loading');
    
    // Remove loading class after page is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.handlePageReady);
    } else {
      // If already loaded, handle immediately
      this.handlePageReady();
    }
  }
  
  static handlePageReady = () => {
    // TEMPORARILY DISABLED - Wait just enough for React to render critical elements
    // setTimeout(() => {
    //   document.body.classList.remove('page-loading');
    // }, 200); // Shorter delay to prevent interference with interactions
  }
}

// Initialize immediately when this module loads
if (typeof document !== 'undefined') {
  PageLoadManager.init();
}