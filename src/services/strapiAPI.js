import axios from 'axios';

// Strapi API configuration
const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'https://victorious-card-243d7ebfa0.strapiapp.com';
const STRAPI_API_TOKEN = process.env.REACT_APP_STRAPI_API_TOKEN;
// Enable Strapi if we have a token, unless explicitly disabled
const STRAPI_ENABLED = process.env.REACT_APP_STRAPI_ENABLED !== 'false' && !!STRAPI_API_TOKEN;

// Debug logging for production troubleshooting
console.log('🔧 Strapi Configuration Debug:', {
  hasUrl: !!process.env.REACT_APP_STRAPI_URL,
  hasToken: !!STRAPI_API_TOKEN,
  tokenLength: STRAPI_API_TOKEN ? STRAPI_API_TOKEN.length : 0,
  enabled: STRAPI_ENABLED,
  baseUrl: API_BASE_URL
});

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` })
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log detailed error information for debugging
    if (error.response) {
      console.warn('Strapi API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url
      });
    } else if (error.code !== 'ERR_NETWORK' && error.code !== 'ECONNREFUSED') {
      console.warn('Strapi API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Articles API functions
export const articlesAPI = {
  // Get all articles for blog index page
  getAll: async () => {
    if (!STRAPI_ENABLED) {
      console.log('Strapi integration disabled - using fallback data');
      return null; // Use fallback data
    }
    
    try {
      console.log('Fetching articles from:', `${API_BASE_URL}/api/articles?populate=featuredImage`);
      console.log('Using authentication:', !!STRAPI_API_TOKEN);
      
      const response = await api.get('/articles?populate=featuredImage');
      console.log('Strapi API success:', response.data);
      return response.data;
    } catch (error) {
      // Log detailed error information for debugging
      if (error.response) {
        console.error('Strapi API Error Details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          message: error.response.data?.error?.message || 'Unknown error',
          details: error.response.data?.error?.details,
          url: error.config?.url
        });
        
        // Provide specific guidance based on error type
        if (error.response.status === 403) {
          console.error('🔒 STRAPI PERMISSION ERROR: The "articles" collection is not publicly accessible.');
          console.error('💡 SOLUTION: Go to Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public → Article → Enable "find" and "findOne" permissions');
        } else if (error.response.status === 401) {
          console.error('🔑 STRAPI AUTH ERROR: Invalid or missing API token.');
          console.error('💡 SOLUTION: Check your REACT_APP_STRAPI_API_TOKEN in .env file or configure public permissions');
        } else if (error.response.status === 404) {
          console.error('📊 STRAPI COLLECTION ERROR: "articles" collection not found.');
          console.error('💡 SOLUTION: Create an "articles" collection type in Strapi with fields: title, excerpt, content, category, slug, author, featuredImage');
        }
      }
      
      // Always return null for fallback data, don't throw
      return null;
    }
  },

  // Get single article by slug
  getBySlug: async (slug) => {
    if (!STRAPI_ENABLED) {
      return null; // Use fallback data
    }
    
    try {
      const response = await api.get(`/articles?filters[slug][$eq]=${slug}&populate=featuredImage`);
      return response.data;
    } catch (error) {
      // Silently handle network errors - fallback will be used
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        return null;
      }
      console.error('Error fetching article by slug:', error);
      throw error;
    }
  },

  // Get articles by category
  getByCategory: async (category) => {
    if (!STRAPI_ENABLED) {
      return null; // Use fallback data
    }
    
    try {
      const response = await api.get(`/articles?filters[category][$eq]=${category}&populate=*`);
      return response.data;
    } catch (error) {
      // Silently handle network errors - fallback will be used
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        return null;
      }
      console.error('Error fetching articles by category:', error);
      throw error;
    }
  }
};

// Snippets API functions
export const snippetsAPI = {
  // Get all snippets for showcase page
  getAll: async () => {
    if (!STRAPI_ENABLED) {
      return null; // Use fallback data
    }
    
    try {
      const response = await api.get('/snippets?populate=*');
      return response.data;
    } catch (error) {
      // Silently handle network errors - fallback will be used
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        return null;
      }
      console.error('Error fetching snippets:', error);
      throw error;
    }
  },

  // Get snippets by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/snippets?filters[category][$eq]=${category}&populate=*`);
      return response.data;
    } catch (error) {
      console.error('Error fetching snippets by category:', error);
      throw error;
    }
  },

  // Get single snippet by id
  getById: async (id) => {
    try {
      const response = await api.get(`/snippets/${id}?populate=*`);
      return response.data;
    } catch (error) {
      console.error('Error fetching snippet by id:', error);
      throw error;
    }
  }
};

// Utility function to get image URL from Strapi
export const getStrapiImageUrl = (imageData) => {
  if (!imageData) return null;

  // First, check for the standard Strapi v4 nested structure
  let imageUrl = imageData.data?.attributes?.url;

  // If that's not found, check for a direct 'url' property (for populated data)
  if (!imageUrl) {
    imageUrl = imageData.url;
  }

  // If no URL could be found in either structure, return null
  if (!imageUrl) return null;

  // If URL is relative, prepend the Strapi base URL
  if (imageUrl.startsWith('/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }

  return imageUrl;
};

// Utility function to format Strapi date
export const formatStrapiDate = (dateString) => {
  if (!dateString) return 'Data non disponibile';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Data non valida';
  }
  
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Utility function to calculate reading time
export const calculateReadingTime = (content) => {
  if (!content) return '5 min';
  
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} min`;
};

export default api;