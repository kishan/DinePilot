import confetti from 'canvas-confetti';

/**
 * Trigger confetti celebration animation
 */
export const triggerConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#10B981', '#F59E0B', '#8B5CF6']
  });
  
  fire(0.2, {
    spread: 60,
    colors: ['#EF4444', '#3B82F6', '#F97316']
  });
  
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#EC4899', '#06B6D4', '#84CC16']
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#F59E0B', '#8B5CF6', '#10B981']
  });
  
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#EF4444', '#3B82F6', '#F97316']
  });
};

/**
 * Trigger a simple confetti burst
 */
export const triggerSimpleConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10B981', '#F59E0B', '#8B5CF6', '#EF4444']
  });
};