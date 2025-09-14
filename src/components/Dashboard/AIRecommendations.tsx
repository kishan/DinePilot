import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { useDashboardState } from '../../hooks/useDashboardState';
import { cardVariants, buttonHoverVariants, celebrationVariants } from '../../utils/animations';
import { triggerConfetti } from '../../utils/confetti';

export const AIRecommendations: React.FC = () => {
  const { state, applyRecommendation } = useDashboardState();
  const [appliedRecommendations, setAppliedRecommendations] = useState<string[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Target className="w-4 h-4" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const handleApplyRecommendation = async (recommendationId: string, title: string) => {
    // Add to applied recommendations
    setAppliedRecommendations(prev => [...prev, recommendationId]);
    
    // Trigger confetti celebration
    triggerConfetti();
    
    // Show celebration message
    setCelebrationMessage(`${title} applied successfully!`);
    setShowCelebration(true);
    
    // Apply the recommendation to dashboard state
    applyRecommendation(recommendationId);
    
    // Hide celebration after 3 seconds
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Lightbulb className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            AI Recommendations
          </h3>
          <p className="text-sm text-gray-600">
            Smart suggestions to boost performance
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {state.recommendations.map((recommendation, index) => {
          const isApplied = state.appliedRecommendations.has(recommendation.id);
          
          return (
            <motion.div
              key={recommendation.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isApplied 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200 hover:border-purple-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {recommendation.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      getPriorityColor(recommendation.priority)
                    }`}>
                      <div className="flex items-center gap-1">
                        {getPriorityIcon(recommendation.priority)}
                        {recommendation.priority.toUpperCase()}
                      </div>
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {recommendation.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Trigger:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {recommendation.category} underperforming
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">
                        {recommendation.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                {(isApplied || appliedRecommendations.includes(recommendation.id)) ? (
                  <motion.div
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium text-sm flex items-center gap-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Applied
                  </motion.div>
                ) : (
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm hover:shadow-md"
                    variants={buttonHoverVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApplyRecommendation(recommendation.id, recommendation.title)}
                  >
                    Apply Suggestion
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">
            AI Insight
          </span>
        </div>
        <p className="text-xs text-purple-700">
          Applying these recommendations could increase your total margin by up to $2,600 today.
        </p>
      </div>
      
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
            variants={celebrationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-semibold text-lg flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              🎉 {celebrationMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};