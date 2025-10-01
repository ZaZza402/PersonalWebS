// src/components/ProcessCard.js
import React from 'react';
import { motion } from 'framer-motion';

// This is a pattern for creating animations with Framer Motion.
// It defines the start state ('hidden') and end state ('visible').
const cardVariants = {
  hidden: { opacity: 0, y: 75 }, // Start 75px below and invisible
  visible: (i) => ({ // The 'visible' state is a function that accepts a custom prop 'i' (our index)
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // The stagger effect: delay is based on the card's index
      type: "spring",
      stiffness: 100,
    },
  }),
};

const ProcessCard = ({ children, index }) => {
  return (
    <motion.div
      className="advantage-card" // We reuse the existing CSS class for styling
      variants={cardVariants}
      initial="hidden"       // Start in the 'hidden' state
      whileInView="visible"  // Animate to the 'visible' state when it enters the viewport
      viewport={{ once: true, amount: 0.5 }} // Trigger the animation once
      custom={index}         // Pass the index to the 'visible' variant for the delay
      whileHover={{ scale: 1.05, y: -10 }} // The "lift" effect on hover
      style={{
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        overflow: 'visible'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ProcessCard;