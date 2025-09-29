// src/components/SnippetPreviewModal.js
import React from 'react';
import './SnippetPreviewModal.css';

const SnippetPreviewModal = ({ snippet, onClose }) => {
  // Create the iframe content as a string
  const createIframeContent = () => {
    if (!snippet) return '';
    
    // Handle Strapi data structure - same as SnippetCard
    const attrs = snippet.attributes || snippet;
    const { htmlCode, cssCode, jsCode } = attrs;
    
    // Debug: Check what we're actually getting
    console.log('=== SNIPPET PREVIEW DEBUG ===');
    console.log('Full snippet object:', snippet);
    console.log('Attrs:', attrs);
    console.log('HTML Code length:', htmlCode?.length || 0);
    console.log('CSS Code length:', cssCode?.length || 0);
    console.log('JS Code length:', jsCode?.length || 0);
    console.log('HTML Code content:', htmlCode);
    console.log('================================');
    
    // Create the iframe content with better fallbacks and debugging
    const iframeContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snippet Preview</title>
    <style>
      /* Basic reset and styling for the preview */
      body { 
        margin: 0; 
        padding: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        min-height: 100vh;
        box-sizing: border-box;
        color: #333;
        position: relative;
        overflow-x: hidden;
      }
      
      /* Add some visual context for fixed positioned elements */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        pointer-events: none;
        z-index: 1;
      }
      /* User CSS */
      ${cssCode || ''}
    </style>
  </head>
  <body>
    <!-- User HTML content -->
    ${htmlCode || '<div style="padding: 20px; text-align: center; color: #666; border: 2px dashed #ccc;"><h2>No HTML Content</h2><p>This snippet has no HTML content to preview.</p></div>'}
    
    <script>
      console.log('Iframe loaded successfully');
      try {
        ${jsCode || '// No JavaScript provided'}
        
        // Auto-trigger any visible demo after the code loads
        setTimeout(() => {
          // Look for notification elements and auto-show them for preview
          const notification = document.getElementById('myNotification');
          if (notification && notification.style.opacity === '0' || notification.classList && !notification.classList.contains('show')) {
            // Auto-show notification for preview
            notification.style.display = 'block';
            notification.classList.add('show');
          }
          
          // Check if there's a showNotification function and call it for demo
          if (typeof showNotification === 'function') {
            showNotification("Preview: This is how your notification looks!", "success", 8000);
          }
        }, 500);
        
      } catch(e) {
        console.error('Snippet JS Error:', e);
        document.body.innerHTML += '<div style="color: red; padding: 10px; border: 1px solid red; margin-top: 10px;">JavaScript Error: ' + e.message + '</div>';
      }
    </script>
  </body>
</html>`;

    console.log('Generated iframe content:', iframeContent);
    return iframeContent;
  };

  if (!snippet) return null;

  // Get title using the same data structure handling as SnippetCard
  const attrs = snippet.attributes || snippet;
  const title = attrs.title || 'Snippet Preview';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Anteprima Live: {title}</h3>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <iframe
            className="snippet-preview-iframe"
            srcDoc={createIframeContent()}
            title="Snippet Preview"
            sandbox="allow-scripts" // Safe: Only allow scripts, no same-origin access
          />
        </div>
      </div>
    </div>
  );
};

export default SnippetPreviewModal;