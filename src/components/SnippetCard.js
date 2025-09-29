import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';
import './SnippetCard.css';

const SnippetCard = ({ 
  snippet, 
  onPreview
}) => {
  const [activeTab, setActiveTab] = useState('html');

  const attrs = snippet.attributes || snippet;
  const {
    title,
    description,
    language,
    downloads = 0,
    rating = 5.0,
    premium = false,
    htmlCode,
    cssCode,
    jsCode
  } = attrs;
  
  // Handle tags defensively - Strapi might return string, array, or null
  let tags = [];
  if (attrs.tags) {
    if (Array.isArray(attrs.tags)) {
      tags = attrs.tags;
    } else if (typeof attrs.tags === 'string') {
      // Handle comma-separated string tags
      tags = attrs.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
  }

  // Debug: Check what code we have
  console.log('=== SNIPPET CARD DEBUG ===');
  console.log('Snippet:', snippet);
  console.log('Raw tags from Strapi:', attrs.tags, 'Type:', typeof attrs.tags);
  console.log('Processed tags array:', tags);
  console.log('HTML Code:', htmlCode);
  console.log('CSS Code:', cssCode);
  console.log('JS Code:', jsCode);
  console.log('==========================');

  const tabs = [
    { id: 'html', label: 'HTML', code: htmlCode, language: 'html' },
    { id: 'css', label: 'CSS', code: cssCode, language: 'css' },
    { id: 'js', label: 'JavaScript', code: jsCode, language: 'javascript' }
  ].filter(tab => tab.code && tab.code.trim() !== '');

  // Download handling removed - now redirects to shop page

  return (
    <motion.div 
      className={`snippet-card-detailed ${premium ? 'premium' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      {premium && (
        <div className="premium-badge">
          <i className='bx bx-crown'></i>
          Premium
        </div>
      )}
      
      <div className="snippet-card-header">
        <div className="snippet-info">
          <h3 className="snippet-title">{title}</h3>
          <p className="snippet-description">{description}</p>
          
          {tags && tags.length > 0 && (
            <div className="snippet-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
          
          <div className="snippet-meta">
            <div className="meta-item">
              <i className='bx bx-download'></i>
              <span>{downloads.toLocaleString()}</span>
            </div>
            <div className="meta-item">
              <i className='bx bx-star'></i>
              <span>{rating}</span>
            </div>
            <div className="meta-item">
              <i className='bx bx-code-alt'></i>
              <span>{language}</span>
            </div>
          </div>
        </div>
        
        <div className="snippet-actions">
          {tabs.length > 0 && htmlCode && htmlCode.trim() !== '' && onPreview && (
            <button 
              className="preview-btn"
              onClick={onPreview}
            >
              <i className="bx bx-show"></i>
              Anteprima
            </button>
          )}
          
          <a 
            href="https://buymeacoffee.com/axweb/extras"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn shop-btn"
          >
            <i className="bx bx-store"></i>
            <span>Vai al Shop</span>
          </a>
          
          <a 
            href="https://buymeacoffee.com/axweb"
            target="_blank"
            rel="noopener noreferrer"
            className="donation-btn"
          >
            <i className="bx bx-coffee"></i>
            <span>Buy Me A Coffee</span>
          </a>
        </div>
      </div>

      {/* Code Tabs */}
      {tabs.length > 0 && (
        <div className="snippet-code-section">
          <div className="code-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="code-content">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab === tab.id ? 'active' : ''}`}
              >
                {activeTab === tab.id && (
                  <CodeBlock
                    code={tab.code}
                    language={tab.language}
                    title={`${tab.label} Code`}
                    showLineNumbers={true}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SnippetCard;