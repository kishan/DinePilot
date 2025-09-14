import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Format currency values for display
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format percentage values for display
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
};

/**
 * Format large numbers with K/M suffixes
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

/**
 * Get color class based on delta value
 */
export const getDeltaColor = (delta: number): string => {
  if (delta > 0) return 'text-green-500';
  if (delta < 0) return 'text-red-500';
  return 'text-yellow-500';
};

/**
 * Get status color for categories
 */
export const getStatusColor = (status: 'Green' | 'Yellow' | 'Red' | 'good' | 'warning' | 'danger' | 'poor'): string => {
  switch (status) {
    case 'Green':
    case 'good':
      return '#10B981';
    case 'Yellow':
    case 'warning':
      return '#F59E0B';
    case 'Red':
    case 'danger':
    case 'poor':
      return '#EF4444';
    default:
      return '#6B7280';
  }
};

/**
 * Get delta icon based on value
 */
export const getDeltaIcon = (delta: number) => {
  if (delta > 0) return TrendingUp;
  if (delta < 0) return TrendingDown;
  return TrendingUp;
};