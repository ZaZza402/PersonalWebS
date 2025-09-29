import axios from 'axios';

// Strapi API configuration
const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
const STRAPI_ENABLED = process.env.REACT_APP_STRAPI_ENABLED === 'true';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only log non-network errors to reduce console spam
    if (error.code !== 'ERR_NETWORK' && error.code !== 'ECONNREFUSED') {
      console.warn('Strapi API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// Articles API functions
export const articlesAPI = {
  // Get all articles for blog index page
  getAll: async () => {
    if (!STRAPI_ENABLED) {
      return null; // Use fallback data
    }
    
    try {
      const response = await api.get('/articles?populate=featuredImage');
      return response.data;
    } catch (error) {
      // Silently handle network errors - fallback will be used
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
        return null;
      }
      console.error('Error fetching articles:', error);
      throw error;
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