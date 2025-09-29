// src/components/AnimatedLogo.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  // We use a string and escape the backslash for JavaScript
  const logoText = "<\\AW>"; 

  return (
    <motion.div
      className="logo" // We use the existing .logo class for styling
      // This is the hover animation: a full 360-degree spin on the Y-axis
      whileHover={{ rotateY: 360 }}
      // This defines the physics of the spin to make it feel smooth and elegant
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
    >
      {logoText}
    </motion.div>
  );
};

export default AnimatedLogo;