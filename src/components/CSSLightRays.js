// src/components/CSSLightRays.js
import React from 'react';
import './CSSLightRays.css';

const CSSLightRays = ({ 
  raysColor = "#00c6ff", 
  raysOrigin = "top-center",
  lightSpread = 0.8,
  followMouse = false 
}) => {
  return (
    <div className="css-light-rays" data-origin={raysOrigin}>
      <div className="ray ray-1" style={{ '--ray-color': raysColor }}></div>
      <div className="ray ray-2" style={{ '--ray-color': raysColor }}></div>
      <div className="ray ray-3" style={{ '--ray-color': raysColor }}></div>
      <div className="ray ray-4" style={{ '--ray-color': raysColor }}></div>
      <div className="ray ray-5" style={{ '--ray-color': raysColor }}></div>
      <div className="gradient-overlay" style={{ 
        '--light-color': raysColor,
        '--light-spread': lightSpread 
      }}></div>
    </div>
  );
};

export default CSSLightRays;