// Environment variable test component for debugging
import React from 'react';

const EnvTest = () => {
  // This will help us debug what environment variables are available at runtime
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_STRAPI_URL: process.env.REACT_APP_STRAPI_URL,
    REACT_APP_STRAPI_API_TOKEN: process.env.REACT_APP_STRAPI_API_TOKEN ? 'PRESENT' : 'MISSING',
    ALL_REACT_APP_VARS: Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
  };

  console.log('🔧 EnvTest Component - Runtime Environment Check:', envVars);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, background: 'black', color: 'white', padding: '10px', fontSize: '12px' }}>
      <div>ENV TEST: {process.env.REACT_APP_STRAPI_URL ? 'URL OK' : 'URL MISSING'} | {process.env.REACT_APP_STRAPI_API_TOKEN ? 'TOKEN OK' : 'TOKEN MISSING'}</div>
    </div>
  );
};

export default EnvTest;