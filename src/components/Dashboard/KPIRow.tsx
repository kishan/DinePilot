import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Star } from 'lucide-react';
import { useDashboardState } from '../../hooks/useDashboardState';
import { formatCurrency, formatPercentage, getStatusColor, getDeltaIcon } from '../../utils/formatters';
import { cardVariants, counterVariants } from '../../utils/animations';
import { KPI } from '../../types/dashboard';

interface KPICardProps {
  kpi: KPI;
  index: number;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, index }) => {
  const statusColor = getStatusColor(kpi.status);
  const DeltaIcon = getDeltaIcon(kpi.trend === 'up' ? 1 : -1);
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow"
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {kpi.title}
          </h3>
          <motion.div
            className="mt-2 flex items-baseline gap-2"
            variants={counterVariants}
            initial="initial"
            animate="animate"
          >
            <span className="text-2xl font-bold text-gray-900">
              {kpi.displayValue}
            </span>
          </motion.div>
        </div>
        
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          kpi.trend === 'up'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <DeltaIcon className="w-3 h-3" />
          <span>{kpi.change}</span>
        </div>
        <span className="text-xs text-gray-500">
          vs last period
        </span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Target</span>
          <span className="font-medium">
            {kpi.target.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
          <motion.div
            className={`h-1.5 rounded-full ${
              kpi.current >= kpi.target ? 'bg-green-500' : 'bg-purple-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const KPIRow: React.FC = () => {
  const { state } = useDashboardState();
  const [animatedKPIs, setAnimatedKPIs] = useState<any[]>([]);
  const [animatingKPIs, setAnimatingKPIs] = useState<string[]>([]);

  // Base KPI data
  const baseKPIs = [
    {
      id: 'total-sales',
      title: 'Total Sales',
      value: '$12,000',
      displayValue: '$12,000',
      current: 12000,
      target: 15000,
      change: '+5.2%',
      trend: 'up' as const,
      status: 'good' as const,
      icon: DollarSign
    },
    {
      id: 'avg-ticket',
      title: 'Avg Ticket Size',
      value: '$8.50',
      displayValue: '$8.50',
      current: 8.50,
      target: 10.00,
      change: '+2.1%',
      trend: 'up' as const,
      status: 'good' as const,
      icon: Target
    },
    {
      id: 'gross-margin',
      title: 'Gross Margin',
      value: '22%',
      displayValue: '22%',
      current: 22,
      target: 25,
      change: '-1.5%',
      trend: 'down' as const,
      status: 'warning' as const,
      icon: TrendingDown
    },
    {
      id: 'guest-satisfaction',
      title: 'Guest Satisfaction',
      value: '82%',
      displayValue: '82%',
      current: 82,
      target: 90,
      change: '+0.8%',
      trend: 'up' as const,
      status: 'good' as const,
      icon: Star
    }
  ];

  // Initialize animated KPIs
  useEffect(() => {
    setAnimatedKPIs(baseKPIs);
  }, []);

  // Animate KPIs when recommendations are applied
  useEffect(() => {
    if (state.appliedRecommendations.size > 0) {
      const updatedKPIs = baseKPIs.map(kpi => {
        let improvement = 0;
        let newStatus = kpi.status;
        
        // Apply improvements based on recommendation types
        state.appliedRecommendations.forEach(recId => {
          if (recId === 'rec1') {
            if (kpi.id === 'total-sales') improvement += 800;
            if (kpi.id === 'avg-ticket') improvement += 0.5;
          }
          if (recId === 'rec2') {
            if (kpi.id === 'gross-margin') improvement += 2;
            if (kpi.id === 'guest-satisfaction') improvement += 3;
          }
          if (recId === 'rec3') {
            if (kpi.id === 'total-sales') improvement += 500;
            if (kpi.id === 'guest-satisfaction') improvement += 2;
          }
        });
        
        const newCurrent = kpi.current + improvement;
        
        // Update status based on improvements
        if (improvement > 0) {
          newStatus = 'good';
          if (kpi.id === 'gross-margin' && newCurrent >= 24) newStatus = 'good';
        }
        
        // Format display value
        let displayValue = '';
        let value = '';
        if (kpi.id === 'total-sales') {
          displayValue = `$${(newCurrent / 1000).toFixed(1)}k`;
          value = `$${newCurrent.toLocaleString()}`;
        } else if (kpi.id === 'avg-ticket') {
          displayValue = `$${newCurrent.toFixed(2)}`;
          value = `$${newCurrent.toFixed(2)}`;
        } else if (kpi.id === 'gross-margin' || kpi.id === 'guest-satisfaction') {
          displayValue = `${Math.round(newCurrent)}%`;
          value = `${Math.round(newCurrent)}%`;
        }
        
        return {
          ...kpi,
          value,
          displayValue,
          current: newCurrent,
          status: newStatus,
          trend: improvement > 0 ? 'up' : kpi.trend,
          change: improvement > 0 ? `+${improvement > 1 ? Math.round(improvement) : improvement.toFixed(1)}${kpi.id.includes('margin') || kpi.id.includes('satisfaction') ? '%' : kpi.id === 'total-sales' ? '' : ''}` : kpi.change
        };
      });
      
      // Trigger animations for improved KPIs
      const improvedKPIIds = updatedKPIs
        .filter((kpi, index) => kpi.current !== baseKPIs[index].current)
        .map(kpi => kpi.id);
      
      setAnimatingKPIs(improvedKPIIds);
      setAnimatedKPIs(updatedKPIs);
      
      // Clear animations after delay
      setTimeout(() => setAnimatingKPIs([]), 2000);
    }
  }, [state.appliedRecommendations]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      {animatedKPIs.map((kpi, index) => {
        const progressPercentage = (kpi.current / kpi.target) * 100;
        
        return (
          <motion.div
            key={kpi.id}
            className={`bg-white rounded-xl p-6 shadow-sm border-2 hover:shadow-md transition-all duration-200 ${
              getStatusColor(kpi.status)
            }`}
            variants={cardVariants}
            initial="hidden"
            animate={animatingKPIs.includes(kpi.id) ? "animate" : "visible"}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">
                {kpi.title}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                kpi.status === 'good' ? 'bg-green-100 text-green-700 border-green-300' :
                kpi.status === 'warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                'bg-red-100 text-red-700 border-red-300'
              }`}>
                {kpi.change}
              </span>
            </div>
            
            <div className="mb-4">
              <motion.div 
                className="text-3xl font-bold text-gray-900 mb-1"
                variants={animatingKPIs.includes(kpi.id) ? counterVariants : {}}
                animate={animatingKPIs.includes(kpi.id) ? "animate" : "initial"}
              >
                {kpi.displayValue}
              </motion.div>
              <div className="text-sm text-gray-500">
                Target: {kpi.id === 'sales' ? `$${kpi.target.toLocaleString()}` : 
                         kpi.id === 'tickets' ? `$${kpi.target}` : 
                         `${kpi.target}%`}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Progress</span>
                <span className="font-bold text-gray-800">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-3 rounded-full ${getProgressColor(kpi.status)} shadow-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};