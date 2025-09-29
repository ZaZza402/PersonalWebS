import React from 'react';
import './CircularLoader.css';

const CircularLoader = ({ 
  state = 'idle', // 'idle', 'loading', 'complete'
  size = 40,
  strokeWidth = 3,
  children,
  className = '',
  ...props 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  return (
    <div 
      className={`circular-loader ${state} ${className}`} 
      style={{ width: size, height: size }}
      {...props}
    >
      <svg 
        className="circular-loader-svg" 
        width={size} 
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          className="circular-loader-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          className="circular-loader-progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={state === 'complete' ? 0 : circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      
      {/* Icon/content container */}
      <div className="circular-loader-content">
        {state === 'idle' && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
        )}
        {state === 'loading' && (
          <div className="circular-loader-spinner">
            <div className="spinner-dot"></div>
          </div>
        )}
        {state === 'complete' && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        )}
        {children}
      </div>
    </div>
  );
};

export default CircularLoader;