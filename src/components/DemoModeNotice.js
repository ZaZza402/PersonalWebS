import React from 'react';
import './DemoModeNotice.css';

const DemoModeNotice = () => {
  if (process.env.REACT_APP_STRAPI_ENABLED === 'true') {
    return null; // Don't show notice if Strapi is enabled
  }

  return (
    <div className="demo-notice">
      <div className="demo-notice-content">
        <i className='bx bx-info-circle'></i>
        <span>
          <strong>Demo Mode:</strong> Showing sample content. 
          Connect to Strapi CMS for dynamic content management.
        </span>
      </div>
    </div>
  );
};

export default DemoModeNotice;