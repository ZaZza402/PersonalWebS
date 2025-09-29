// src/components/GlitchSubheadline.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GlitchSubheadline.css';

const GlitchSubheadline = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);



  useEffect(() => {
    // Glitch characters for the effect
    const glitchChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '[', ']', '{', '}', '|', '\\', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`'];
    const typeText = () => {
      if (currentIndex < text.length) {
        // Typing effect with occasional glitches
        const shouldGlitch = Math.random() < 0.2; // 20% chance of glitch
        
        if (shouldGlitch) {
          setIsGlitching(true);
          // Show glitch characters briefly
          const glitchText = text.substring(0, currentIndex) + 
            glitchChars[Math.floor(Math.random() * glitchChars.length)];
          setDisplayText(glitchText);
          
          setTimeout(() => {
            setDisplayText(text.substring(0, currentIndex + 1));
            setCurrentIndex(prev => prev + 1);
            setIsGlitching(false);
          }, 80);
        } else {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        }
      } else {
        // After typing is complete, add occasional glitches
        const glitchInterval = setInterval(() => {
          if (Math.random() < 0.15) { // 15% chance every interval
            setIsGlitching(true);
            const randomIndex = Math.floor(Math.random() * text.length);
            const glitchedText = text.split('');
            glitchedText[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            setDisplayText(glitchedText.join(''));
            
            setTimeout(() => {
              setDisplayText(text);
              setIsGlitching(false);
            }, 150);
          }
        }, 2000);
        
        return () => clearInterval(glitchInterval);
      }
    };

    const timeout = setTimeout(typeText, currentIndex === 0 ? 800 : 30 + Math.random() * 40);
    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return (
    <div className="glitch-container">
      <motion.p
        className={`hero-subheadline glitch-text ${isGlitching ? 'glitching' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {displayText}
        <motion.span 
          className="cursor"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          |
        </motion.span>
      </motion.p>
      
      {/* Glitch overlay effects */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.div
              className="glitch-overlay glitch-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
            <motion.div
              className="glitch-overlay glitch-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, delay: 0.05 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlitchSubheadline;