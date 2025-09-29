// src/components/GlowHoverCard.js
import React from 'react';
import { motion } from 'framer-motion';

const GlowHoverCard = ({ children, direction = 'left' }) => {
  const initialX = direction === 'left' ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{
        y: -10,
        boxShadow: "0 0 25px 5px rgba(0, 198, 255, 0.4)", // The glow effect
        transition: { duration: 0.3 }
      }}
      transition={{ type: 'spring', stiffness: 100 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="service-card">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowHoverCard;