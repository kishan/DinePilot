import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Users, Clock, AlertTriangle } from 'lucide-react';
import { useDashboardState } from '../../hooks/useDashboardState';
import { formatCurrency, formatPercentage, getStatusColor } from '../../utils/formatters';
import { cardVariants } from '../../utils/animations';
import { LeaderboardItem } from '../../types/dashboard';

interface LeaderboardItemProps {
  item: LeaderboardItem & { id: string; value: number; change: number };
  rank: number;
  type: 'items' | 'staff';
}

const LeaderboardItemComponent: React.FC<LeaderboardItemProps> = ({ item, rank, type }) => {
  const statusColor = getStatusColor(item.status);
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };
  
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
        <span className="text-sm font-bold text-gray-700">
          {getRankIcon(rank)}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-600">
            {type === 'items' ? formatCurrency(item.value) : `${item.value} sales`}
          </span>
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
        </div>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          item.change >= 0
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {item.change >= 0 ? '+' : ''}{formatPercentage(item.change)}
        </div>
      </div>
    </motion.div>
  );
};

interface LeaderboardSectionProps {
  title: string;
  items: (LeaderboardItem & { id: string; value: number; change: number })[];
  type: 'items' | 'staff';
  icon: string;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ title, items, type, icon }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
      variants={cardVariants}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <LeaderboardItemComponent
            key={item.id}
            item={item}
            rank={index + 1}
            type={type}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No data available</p>
        </div>
      )}
    </motion.div>
  );
};

export const Leaderboard: React.FC = () => {
  const { state } = useDashboardState();

  // Mock leaderboard data based on requirements
  const topPerformer = { name: 'Sandwiches', value: '$5,000', status: 'good' };
  const needsAttention = { name: 'Desserts', value: '$1,200', status: 'poor' };
  
  const quickStats = [
    { id: 'avg_wait', value: '3.2 min', label: 'Avg Wait Time' },
    { id: 'orders_hour', value: '47', label: 'Orders/Hour' },
    { id: 'satisfaction', value: '4.2★', label: 'Rating' },
    { id: 'efficiency', value: '94%', label: 'Kitchen Efficiency' }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Performance Leaderboard
      </h3>

      <div className="space-y-6">
        {/* Top Performer */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-green-500" />
            Top Performer
          </h4>
          <motion.div
            className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{topPerformer.name}</div>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Exceeding target
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-700">{topPerformer.value}</div>
              <div className="text-xs text-green-600">100% of target</div>
            </div>
          </motion.div>
        </div>

        {/* Needs Attention */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Needs Attention
          </h4>
          <motion.div
            className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{needsAttention.name}</div>
                <div className="text-xs text-amber-600 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  Below target
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-amber-700">{needsAttention.value}</div>
              <div className="text-xs text-amber-600">80% of target</div>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            Quick Stats
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="p-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (index + 3) * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};