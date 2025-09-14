import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardState } from '../../hooks/useDashboardState';
import { DayScenario } from '../../types/dashboard';
import { cardVariants, buttonHoverVariants, toggleVariants } from '../../utils/animations';

const scenarios: { value: DayScenario; label: string }[] = [
  { value: 'Normal Day', label: 'Normal Day' },
  { value: 'Rainy Day', label: 'Rainy Day' },
  { value: 'Hot Day', label: 'Hot Day' },
  { value: 'Staff Shortage', label: 'Staff Shortage' },
  { value: 'Promo Running', label: 'Promo Running' }
];

export const DashboardHeader: React.FC = () => {
  const { state, setScenario, toggleBeforeAfter, resetData } = useDashboardState();

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100"
      variants={cardVariants}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent flex items-center gap-2">
            🍔 Restaurant GM Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time insights and AI-powered recommendations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Scenario Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Scenario:
            </label>
            <select
              value={state.currentScenario}
              onChange={(e) => setScenario(e.target.value as DayScenario)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            >
              {scenarios.map((scenario) => (
                <option key={scenario.value} value={scenario.value}>
                  {scenario.label}
                </option>
              ))}
            </select>
          </div>

          {/* Before/After Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Before
            </span>
            <motion.button
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                state.isBeforeAfterMode ? 'bg-gray-300' : 'bg-purple-600'
              }`}
              onClick={toggleBeforeAfter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                variants={toggleVariants}
                animate={state.isBeforeAfterMode ? 'off' : 'on'}
              />
            </motion.button>
            <span className="text-sm font-medium text-gray-700">
              After
            </span>
          </div>

          {/* Reset Button */}
          <motion.button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={resetData}
          >
            Reset
          </motion.button>
        </div>
      </div>

      {/* Current Status Indicator */}
      <div className="mt-4 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          state.isBeforeAfterMode ? 'bg-blue-500' : 'bg-green-500'
        }`} />
        <span className="text-sm text-gray-600">
          {state.isBeforeAfterMode ? 'Showing original state' : 'Showing current results'}
        </span>
        <span className="text-sm text-gray-400">•</span>
        <span className="text-sm text-gray-600">
          {scenarios.find(s => s.value === state.currentScenario)?.label}
        </span>
      </div>
    </motion.div>
  );
};