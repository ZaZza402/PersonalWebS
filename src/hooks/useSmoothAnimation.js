import { useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { usePageLoad } from '../contexts/PageLoadContext';

export const useSmoothAnimation = (variants, options = {}) => {
  const ref = useRef();
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    ...options 
  });
  const controls = useAnimation();
  const { isPageLoaded } = usePageLoad();

  useEffect(() => {
    if (isPageLoaded && isInView) {
      controls.start("visible");
    }
  }, [isInView, isPageLoaded, controls]);

  return { ref, controls, isInView };
};

// Smooth variants that don't cause layout shift
export const smoothVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0 } // Instant initial state
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  }
};

// For elements that should be immediately visible but can animate on scroll
export const reservedSpaceVariants = {
  hidden: { 
    opacity: 0.1, // Barely visible but reserves layout space
    y: 0, // No transform that affects layout
    transition: { duration: 0 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut"
    }
  }
};

// For staggered animations
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 10,
    transition: { duration: 0 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut"
    }
  }
};