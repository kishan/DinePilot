import { useState, useEffect } from 'react';
import { DashboardState, DayScenario } from '../types/dashboard';
import { mockDataService } from '../services/mockDataService';

export const useMockData = () => {
  const [data, setData] = useState<DashboardState>(() => mockDataService.getDashboardData());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newData = mockDataService.getDashboardData();
      setData(newData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const applyRecommendation = async (recommendationId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedData = mockDataService.applyRecommendation(recommendationId);
      setData(updatedData);
      
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply recommendation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleBeforeAfter = () => {
    try {
      const updatedData = mockDataService.toggleBeforeAfter();
      setData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle view');
      throw err;
    }
  };

  const setScenario = (scenario: DayScenario) => {
    try {
      const updatedData = mockDataService.setScenario(scenario);
      setData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set scenario');
      throw err;
    }
  };

  const resetToOriginal = () => {
    try {
      const originalData = mockDataService.resetToOriginal();
      setData(originalData);
      return originalData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset data');
      throw err;
    }
  };

  // Auto-refresh data on mount
  useEffect(() => {
    refreshData();
  }, []);

  return {
    data,
    loading,
    error,
    refreshData,
    applyRecommendation,
    toggleBeforeAfter,
    setScenario,
    resetToOriginal
  };
};