// src/components/ContactButton.js
import React from 'react';
import { motion } from 'framer-motion';

// This defines the animation for each individual button.
// It will be controlled by the parent container's stagger effect.
const buttonVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  },
};

const ContactButton = ({ href, iconClass, text, target, rel }) => {
  return (
    // We use motion.a because the original element is an anchor tag.
    // This preserves all its accessibility and link properties.
    <motion.a
      className="contact-btn" // Reuses your existing styling
      href={href}
      target={target}
      rel={rel}
      variants={buttonVariants} // Apply the animation variants
      whileHover={{ scale: 1.05, y: -5 }} // Lifts up and scales on hover
      whileTap={{ scale: 0.95 }} // "Squishes" down when clicked
    >
      <i className={iconClass}></i>
      <span>{text}</span>
    </motion.a>
  );
};

export default ContactButton;