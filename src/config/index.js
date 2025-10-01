// Explicit environment variable references for webpack
const STRAPI_URL = process.env.REACT_APP_STRAPI_URL;
const STRAPI_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;
const STRAPI_ENABLED = process.env.REACT_APP_STRAPI_ENABLED;

// Configuration file to ensure environment variables are properly included in build
const config = {
  strapi: {
    url: STRAPI_URL || 'https://victorious-card-243d7ebfa0.strapiapp.com',
    apiToken: STRAPI_TOKEN || '',
    enabled: STRAPI_ENABLED !== 'false' && !!STRAPI_TOKEN
  },
  environment: process.env.NODE_ENV || 'development'
};

// Force webpack to include these environment variables
const envVars = {
  REACT_APP_STRAPI_URL: STRAPI_URL,
  REACT_APP_STRAPI_API_TOKEN: STRAPI_TOKEN,
  REACT_APP_STRAPI_ENABLED: STRAPI_ENABLED
};

console.log('🔧 Config.js loaded with env vars:', {
  hasUrl: !!STRAPI_URL,
  hasToken: !!STRAPI_TOKEN,
  urlValue: STRAPI_URL,
  tokenLength: STRAPI_TOKEN ? STRAPI_TOKEN.length : 0,
  enabled: config.strapi.enabled,
  nodeEnv: process.env.NODE_ENV
});

export default config;
export { envVars };