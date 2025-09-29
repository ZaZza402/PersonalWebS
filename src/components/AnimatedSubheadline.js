// src/components/AnimatedSubheadline.js
import React from 'react';
import { motion } from 'framer-motion';

// This is the "container" that will orchestrate the stagger effect for the letters
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0.5 * i },
  }),
};

// This is the animation for each individual letter
const letterVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

const AnimatedSubheadline = ({ text }) => {
  const words = text.split(" ");

  return (
    <motion.p
      className="hero-subheadline"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        // Wrap each word in a span to prevent line breaks within words
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
          {/* Add a non-breaking space after each word */}
          <span> </span>
        </span>
      ))}
    </motion.p>
  );
};

export default AnimatedSubheadline;