import React, { useReducer, useContext, createContext, ReactNode } from 'react';
import { DashboardState, DayScenario } from '../types/dashboard';
import { mockDataService } from '../services/mockDataService';

type DashboardAction =
  | { type: 'LOAD_DATA' }
  | { type: 'APPLY_RECOMMENDATION'; payload: string }
  | { type: 'TOGGLE_BEFORE_AFTER' }
  | { type: 'SET_SCENARIO'; payload: DayScenario }
  | { type: 'RESET_DATA' };

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'LOAD_DATA':
      return mockDataService.getDashboardData();
    
    case 'APPLY_RECOMMENDATION':
      return mockDataService.applyRecommendation(action.payload);
    
    case 'TOGGLE_BEFORE_AFTER':
      return {
        ...state,
        isBeforeAfterMode: !state.isBeforeAfterMode,
      };
    
    case 'SET_SCENARIO':
      return mockDataService.setScenario(action.payload);
    
    case 'RESET_DATA':
      return mockDataService.resetToOriginal();
    
    default:
      return state;
  }
};

interface DashboardContextType {
  state: DashboardState;
  loadData: () => void;
  applyRecommendation: (id: string) => void;
  toggleBeforeAfter: () => void;
  setScenario: (scenario: DayScenario) => void;
  resetData: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const initialState: DashboardState = {
    kpis: [],
    categories: [],
    recommendations: [],
    leaderboard: { topItems: [], topStaff: [], quickStats: [] },
    currentScenario: 'Normal Day',
    isBeforeAfterMode: false,
    isLoading: false,
    appliedRecommendations: new Set(),
  };
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const loadData = () => {
    dispatch({ type: 'LOAD_DATA' });
  };

  const applyRecommendation = (id: string) => {
    dispatch({ type: 'APPLY_RECOMMENDATION', payload: id });
  };

  const toggleBeforeAfter = () => {
    dispatch({ type: 'TOGGLE_BEFORE_AFTER' });
  };

  const setScenario = (scenario: DayScenario) => {
    dispatch({ type: 'SET_SCENARIO', payload: scenario });
  };

  const resetData = () => {
    dispatch({ type: 'RESET_DATA' });
  };

  const contextValue: DashboardContextType = {
    state,
    loadData,
    applyRecommendation,
    toggleBeforeAfter,
    setScenario,
    resetData
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardState = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a DashboardProvider');
  }
  return context;
};