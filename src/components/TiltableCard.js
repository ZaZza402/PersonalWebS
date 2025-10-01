// src/components/TiltableCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSmoothAnimation, reservedSpaceVariants } from '../hooks/useSmoothAnimation';

const TiltableCard = ({ children, linkTo }) => {
  const { ref, controls } = useSmoothAnimation(reservedSpaceVariants);

  return (
    <Link to={linkTo} className="service-card-link">
      <motion.div
        ref={ref}
        className="service-card animate-in-view"
        // Use smooth variants that don't cause layout shift
        variants={reservedSpaceVariants}
        initial="hidden"
        animate={controls}
        // Hover animation only
        whileHover={{
          scale: 1.02, // Reduced scale for less jarring effect
          boxShadow: "0px 15px 30px rgba(0,0,0,0.3)"
        }}
        // Smoother transition
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        style={{
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default TiltableCard;