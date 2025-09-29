// src/components/ParallaxCard.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxCard = ({ children, imageSrc, imageAlt, reverse = false }) => {
  const containerRef = useRef(null);

  // This hook tracks the scroll progress of the containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Animate from when the top of the card enters the bottom of the screen to when the bottom of the card leaves the top.
  });

  // This transforms the scroll progress (0 to 1) into a y-axis movement for the image (-20% to 20%)
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const cardContent = (
    <>
      <div className="service-detail-content">
        {children}
      </div>
      <div className="service-detail-image">
        {/* The image is wrapped in a motion.div to be animated */}
        <motion.img 
          src={imageSrc} 
          alt={imageAlt} 
          style={{ y: imageY }} // Apply the parallax transform here
        />
      </div>
    </>
  );

  return (
    <motion.div
      ref={containerRef}
      className={`service-detail-card ${reverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {cardContent}
    </motion.div>
  );
};

export default ParallaxCard;