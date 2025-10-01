// src/components/MagneticChannelCard.js
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

const MagneticChannelCard = ({ children }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const transform = useMotionTemplate`rotateX(${springY}deg) rotateY(${springX}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;

    mouseX.set(xPct * 20); // Rotate up to 10 degrees on Y-axis
    mouseY.set(yPct * -20); // Rotate up to 10 degrees on X-axis
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform, 
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }}
      className="channel-card-wrapper" // A wrapper for positioning
    >
      {children}
    </motion.div>
  );
};

export default MagneticChannelCard;