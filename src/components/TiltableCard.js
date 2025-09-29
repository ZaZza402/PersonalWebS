// src/components/TiltableCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TiltableCard = ({ children, linkTo }) => {
  return (
    // This is the motion component that will handle all the animations
    <motion.div
      // 1. Initial state (before it appears on screen)
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      // 2. Animation state (once it's in view)
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      // 3. Animation while hovering over the card
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.4)"
      }}
      // 4. Defines the physics of the animation
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      // 5. Detects when it comes into the viewport to trigger the animation
      viewport={{ once: true, amount: 0.5 }}
    >
      <Link to={linkTo} className="service-card-link">
        <div className="service-card">
          {children}
        </div>
      </Link>
    </motion.div>
  );
};

export default TiltableCard;