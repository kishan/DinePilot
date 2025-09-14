import { useState, useCallback } from 'react';
import { useAnimation } from 'framer-motion';

export interface AnimationState {
  isAnimating: boolean;
  showCelebration: boolean;
  animatingBars: string[];
  animatingCounters: string[];
}

export const useAnimations = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isAnimating: false,
    showCelebration: false,
    animatingBars: [],
    animatingCounters: []
  });

  const barControls = useAnimation();
  const counterControls = useAnimation();
  const celebrationControls = useAnimation();

  const triggerBarGrowth = useCallback(async (categoryName: string) => {
    setAnimationState(prev => ({
      ...prev,
      isAnimating: true,
      animatingBars: [...prev.animatingBars, categoryName]
    }));

    await barControls.start('animate');

    setAnimationState(prev => ({
      ...prev,
      animatingBars: prev.animatingBars.filter(name => name !== categoryName)
    }));
  }, [barControls]);

  const triggerCounterAnimation = useCallback(async (counterId: string) => {
    setAnimationState(prev => ({
      ...prev,
      animatingCounters: [...prev.animatingCounters, counterId]
    }));

    await counterControls.start('animate');

    setAnimationState(prev => ({
      ...prev,
      animatingCounters: prev.animatingCounters.filter(id => id !== counterId)
    }));
  }, [counterControls]);

  const triggerCelebration = useCallback(async () => {
    setAnimationState(prev => ({
      ...prev,
      showCelebration: true
    }));

    await celebrationControls.start('visible');

    // Auto-hide after 3 seconds
    setTimeout(async () => {
      await celebrationControls.start('exit');
      setAnimationState(prev => ({
        ...prev,
        showCelebration: false
      }));
    }, 3000);
  }, [celebrationControls]);

  const triggerRecommendationApplied = useCallback(async (categoryName: string, counterId: string) => {
    setAnimationState(prev => ({ ...prev, isAnimating: true }));

    // Sequence the animations
    await Promise.all([
      triggerBarGrowth(categoryName),
      triggerCounterAnimation(counterId)
    ]);

    await triggerCelebration();

    setAnimationState(prev => ({ ...prev, isAnimating: false }));
  }, [triggerBarGrowth, triggerCounterAnimation, triggerCelebration]);

  const resetAnimations = useCallback(() => {
    setAnimationState({
      isAnimating: false,
      showCelebration: false,
      animatingBars: [],
      animatingCounters: []
    });
    
    barControls.stop();
    counterControls.stop();
    celebrationControls.stop();
  }, [barControls, counterControls, celebrationControls]);

  return {
    animationState,
    controls: {
      bar: barControls,
      counter: counterControls,
      celebration: celebrationControls
    },
    triggerBarGrowth,
    triggerCounterAnimation,
    triggerCelebration,
    triggerRecommendationApplied,
    resetAnimations
  };
};