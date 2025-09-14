import { Variants } from 'framer-motion';

/**
 * Animation variants for card entrance
 */
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

/**
 * Animation variants for staggered children
 */
export const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Animation variants for bar growth
 */
export const barGrowthVariants: Variants = {
  initial: {
    width: 0
  },
  animate: {
    width: '100%',
    transition: {
      duration: 1.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Animation variants for counter increment
 */
export const counterVariants: Variants = {
  initial: {
    scale: 1
  },
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: 'easeInOut'
    }
  }
};

/**
 * Animation variants for celebration badge
 */
export const celebrationVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: -50,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Animation variants for button hover
 */
export const buttonHoverVariants: Variants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

/**
 * Animation variants for toggle switch
 */
export const toggleVariants: Variants = {
  off: {
    x: 0
  },
  on: {
    x: 24,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30
    }
  }
};

/**
 * Confetti animation configuration
 */
export const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#10B981', '#F59E0B', '#8B5CF6', '#EF4444']
};

/**
 * Utility function to create staggered animation delays
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};