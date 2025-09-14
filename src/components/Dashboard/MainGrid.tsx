import React from 'react';
import { SalesChart } from './SalesChart';
import { AIRecommendations } from './AIRecommendations';

export const MainGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Sales Chart */}
      <SalesChart />
      
      {/* Right Panel - AI Recommendations */}
      <AIRecommendations />
    </div>
  );
};