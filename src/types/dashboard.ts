export interface KPI {
  id: string;
  title: string;
  value: string;
  displayValue: string;
  current: number;
  target: number;
  change: string;
  trend: 'up' | 'down';
  status: 'good' | 'warning' | 'danger';
  icon?: any;
}

export interface Category {
  id: string;
  name: string;
  current: number;
  target: number;
  status: 'good' | 'warning' | 'danger' | 'poor';
  sales: number;
  margin_pct: number;
  percentage?: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  expected_uplift_margin?: number;
}

export interface LeaderboardItem {
  name: string;
  sales: number;
  status?: 'good' | 'warning' | 'danger';
}

export interface LeaderboardData {
  topItems?: LeaderboardItem[];
  topStaff?: LeaderboardItem[];
  quickStats?: {
    label: string;
    value: string;
    trend: 'up' | 'down';
  }[];
  topPerformer?: { name: string; value: string };
  needsAttention?: { name: string; value: string };
}

// Legacy interfaces for backward compatibility
export interface KPIData {
  total_sales: number;
  avg_ticket_size: number;
  gross_margin_percent: number;
  guest_satisfaction: number;
  deltas: {
    total_sales_pct: number;
    avg_ticket_pct: number;
    gross_margin_pct: number;
    guest_sat_pct: number;
  };
}

export interface CategoryData {
  name: string;
  sales: number;
  margin_pct: number;
  status: 'Green' | 'Yellow' | 'Red';
}

export interface RecommendationScenario {
  id: string;
  trigger: string;
  recommendation: string;
  expected_uplift_margin: number;
  impact: {
    category: string;
    new_sales: number;
    margin_gain: number;
  };
}

export interface DashboardState {
  kpis: KPI[];
  categories: Category[];
  recommendations: Recommendation[];
  leaderboard: LeaderboardData;
  currentScenario: DayScenario;
  isBeforeAfterMode: boolean;
  isLoading: boolean;
  appliedRecommendations: Set<string>;
}

export type DayScenario = 'Normal Day' | 'Rainy Day' | 'Hot Day' | 'Staff Shortage' | 'Promo Running';

export interface MockDataResponse {
  kpis: KPIData;
  categories: CategoryData[];
  scenarios: RecommendationScenario[];
  leaderboard: LeaderboardData;
}