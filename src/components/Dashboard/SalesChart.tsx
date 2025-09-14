import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDashboardState } from '../../hooks/useDashboardState';
import { cardVariants, barGrowthVariants } from '../../utils/animations';

export const SalesChart: React.FC = () => {
  const { state } = useDashboardState();
  const [animatedData, setAnimatedData] = useState<any[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock sales data based on requirements
  const baseSalesData = [
    { name: 'Sandwiches', current: 5000, target: 5000, status: 'good' },
    { name: 'Coffee', current: 3200, target: 3500, status: 'warning' },
    { name: 'Desserts', current: 1200, target: 1500, status: 'poor' },
    { name: 'Fries', current: 2800, target: 3000, status: 'warning' },
    { name: 'Drinks', current: 4100, target: 4000, status: 'good' }
  ];

  // Initialize animated data
  useEffect(() => {
    setAnimatedData(baseSalesData);
  }, []);

  // Animate bars when recommendations are applied
  useEffect(() => {
    if (state.appliedRecommendations.size > 0) {
      setIsAnimating(true);
      
      // Simulate data improvements based on applied recommendations
      const improvedData = baseSalesData.map(item => {
        let improvement = 0;
        
        // Apply different improvements based on recommendation types
        state.appliedRecommendations.forEach(recId => {
          if (recId === 'rec1' && item.name === 'Coffee') improvement += 300;
          if (recId === 'rec2' && item.name === 'Desserts') improvement += 200;
          if (recId === 'rec3') improvement += 150; // General improvement
        });
        
        return {
          ...item,
          current: Math.min(item.current + improvement, item.target * 1.1),
          status: (item.current + improvement) >= item.target ? 'good' : 
                 (item.current + improvement) >= item.target * 0.9 ? 'warning' : 'poor'
        };
      });
      
      setAnimatedData(improvedData);
      
      setTimeout(() => setIsAnimating(false), 1500);
    }
  }, [state.appliedRecommendations]);

  const getBarColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#10b981'; // green-500
      case 'warning':
        return '#f59e0b'; // yellow-500
      case 'poor':
        return '#ef4444'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const chartData = state.categories.map(category => ({
    name: category.name,
    sales: category.sales,
    status: category.status,
    target: category.target
  }));

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sales Performance by Category
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Current vs Target Sales
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">On Target</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-600">Below Target</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Needs Attention</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={animatedData}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 'dataMax']}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              className="text-xs text-gray-600"
            />
            <YAxis 
              type="category" 
              dataKey="name"
              width={70}
              className="text-xs text-gray-600"
            />
            <Bar 
              dataKey="current" 
              radius={[0, 4, 4, 0]}
              stroke="#fff"
              strokeWidth={1}
              animationDuration={isAnimating ? 1500 : 800}
              animationEasing="ease-out"
            >
              {animatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.status)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-4 text-sm">
        {state.categories.map((category) => {
          const percentage = ((category.sales / category.target) * 100).toFixed(1);
          const statusColor = category.status === 'good' ? 'text-green-600' :
                             category.status === 'warning' ? 'text-yellow-600' : 'text-red-600';
          
          return (
            <div key={category.id} className="text-center">
              <div className="font-medium text-gray-900">
                ${(category.sales / 1000).toFixed(1)}k
              </div>
              <div className={`text-xs font-medium ${statusColor}`}>
                {percentage}% of target
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};