// src/components/FloatingWhatsAppButton.js
import React from 'react';
import { motion } from 'framer-motion';

const labelVariants = {
  hidden: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const FloatingWhatsAppButton = ({ phoneNumber, ariaLabel }) => {
  return (
    <motion.div
      className="fab-container"
      // This makes the whole container (button + label) animate on hover
      whileHover="visible"
      // This is the initial animation for the button itself
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1, // Let the page load before the button bounces in
      }}
    >
      <motion.div className="fab-label" variants={labelVariants} initial="hidden">
        Chatta su WhatsApp
      </motion.div>

      <motion.a
        href={`https://wa.me/${phoneNumber}`}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        className="fab"
        // This makes the button bounce when hovered
        whileHover={{ scale: 1.15, rotate: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* The external, dispersing waves */}
        <motion.div
          className="fab-beacon"
          animate={{
            scale: [1, 3],   // Expand even larger
            opacity: [0.7, 0], // Fade out completely
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: 1,
          }}
        />
        <motion.div
          className="fab-beacon"
          animate={{
            scale: [1, 3],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: 1,
            delay: 0.5, // The ripple delay
          }}
        />
        
        <i className='bx bxl-whatsapp'></i>
      </motion.a>
    </motion.div>
  );
};

export default FloatingWhatsAppButton;