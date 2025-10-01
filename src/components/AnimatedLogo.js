// src/components/AnimatedLogo.js
import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedLogo.css';

const AnimatedLogo = () => {
  // Continuous subtle breathing animation
  const breathingVariant = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Staggered character animations for the brackets and letters
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    animate: {
      y: [0, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  const bracketVariants = {
    animate: {
      rotateY: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="animated-logo-container"
      variants={breathingVariant}
      animate="animate"
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className="logo-content"
        variants={containerVariants}
        animate="animate"
      >
        <motion.span 
          className="logo-bracket logo-bracket-open"
          variants={bracketVariants}
        >
          &lt;
        </motion.span>
        <motion.span 
          className="logo-backslash"
          variants={letterVariants}
        >
          \
        </motion.span>
        <motion.span 
          className="logo-letters"
          variants={letterVariants}
        >
          AW
        </motion.span>
        <motion.span 
          className="logo-bracket logo-bracket-close"
          variants={bracketVariants}
        >
          &gt;
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;