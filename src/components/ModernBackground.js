// src/components/ModernBackground.js
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ModernBackground.css';

const ModernBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = window.innerWidth > 768 ? 25 : 15;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
          delay: Math.random() * 2,
          duration: Math.random() * 20 + 15,
          shape: Math.random() > 0.5 ? 'circle' : 'square',
          opacity: Math.random() * 0.3 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('resize', generateParticles);
    return () => window.removeEventListener('resize', generateParticles);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="modern-background">
      {/* Animated gradient overlay */}
      <div className="gradient-layers">
        <div className="gradient-layer gradient-1"></div>
        <div className="gradient-layer gradient-2"></div>
        <div className="gradient-layer gradient-3"></div>
      </div>

      {/* Interactive mouse follower */}
      <motion.div 
        className="mouse-follower"
        animate={{
          x: `${mousePosition.x}%`,
          y: `${mousePosition.y}%`,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      {/* Geometric particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`particle ${particle.shape}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          initial={{ 
            rotate: particle.rotation,
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            rotate: particle.rotation + 360,
            scale: [0.5, 1, 0.8, 1],
            opacity: [0, particle.opacity, particle.opacity * 0.5, particle.opacity],
            y: [-10, 10, -5, 8, -10],
            x: [-5, 8, -3, 5, -5]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <div className="floating-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className={`floating-shape shape-${i + 1}`}
            initial={{ 
              rotate: 0,
              y: 0,
              opacity: 0 
            }}
            animate={{
              rotate: 360,
              y: [-15, 15, -10, 20, -15],
              opacity: [0, 0.6, 0.3, 0.7, 0]
            }}
            transition={{
              duration: 25 + i * 5,
              delay: i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Grid overlay for depth */}
      <div className="grid-overlay">
        <div className="grid-lines-vertical">
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line vertical" style={{ left: `${(i + 1) * 8.33}%` }} />
          ))}
        </div>
        <div className="grid-lines-horizontal">
          {[...Array(8)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line horizontal" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernBackground;