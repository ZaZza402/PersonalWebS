import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  title = '', 
  showLineNumbers = true,
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) {
    return (
      <div className="code-block-empty">
        <p>No code available</p>
      </div>
    );
  }

  return (
    <div className={`code-block ${className}`}>
      {title && (
        <div className="code-block-header">
          <span className="code-block-title">{title}</span>
          <span className="code-block-language">{language.toUpperCase()}</span>
        </div>
      )}
      
      <div className="code-block-container">
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: title ? '0 0 8px 8px' : '8px',
            fontSize: '0.9rem',
            lineHeight: '1.4'
          }}
          codeTagProps={{
            style: {
              fontFamily: '"Fira Code", "Consolas", "Monaco", monospace'
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
        
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className={`copy-button ${copied ? 'copied' : ''}`}>
            {copied ? (
              <>
                <i className='bx bx-check'></i>
                <span>Copiato!</span>
              </>
            ) : (
              <>
                <i className='bx bx-copy'></i>
                <span>Copia</span>
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CodeBlock;