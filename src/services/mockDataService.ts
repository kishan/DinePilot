import { DashboardState, KPI, Category, Recommendation, LeaderboardData, DayScenario } from '../types/dashboard';

class MockDataService {
  private currentData: DashboardState;

  constructor() {
    this.currentData = this.generateInitialData();
  }

  private generateInitialData(): DashboardState {
    return {
      kpis: [
        {
          id: 'sales',
          title: 'Total Sales',
          value: '$12,000',
          displayValue: '$12,000',
          change: '+8%',
          trend: 'up' as const,
          status: 'good' as const,
          target: 11000,
          current: 12000
        },
        {
          id: 'tickets',
          title: 'Avg Ticket',
          value: '$8.50',
          displayValue: '$8.50',
          change: '+2%',
          trend: 'up' as const,
          status: 'good' as const,
          target: 8.00,
          current: 8.50
        },
        {
          id: 'margin',
          title: 'Gross Margin',
          value: '22%',
          displayValue: '22%',
          change: '-3%',
          trend: 'down' as const,
          status: 'warning' as const,
          target: 25,
          current: 22
        },
        {
          id: 'satisfaction',
          title: 'Guest Satisfaction',
          value: '82%',
          displayValue: '82%',
          change: '+5%',
          trend: 'up' as const,
          status: 'good' as const,
          target: 80,
          current: 82
        }
      ],
      categories: [
        {
          id: 'sandwiches',
          name: 'Sandwiches',
          current: 5000,
          sales: 5000,
          target: 4500,
          status: 'good' as const,
          margin_pct: 25,
          percentage: 42
        },
        {
          id: 'coffee',
          name: 'Coffee',
          current: 2800,
          sales: 2800,
          target: 3000,
          status: 'warning' as const,
          margin_pct: 35,
          percentage: 23
        },
        {
          id: 'desserts',
          name: 'Desserts',
          current: 1200,
          sales: 1200,
          target: 2000,
          status: 'poor' as const,
          margin_pct: 45,
          percentage: 10
        },
        {
          id: 'fries',
          name: 'Fries',
          current: 1800,
          sales: 1800,
          target: 1500,
          status: 'good' as const,
          margin_pct: 30,
          percentage: 15
        },
        {
          id: 'drinks',
          name: 'Drinks',
          current: 1200,
          sales: 1200,
          target: 1000,
          status: 'good' as const,
          margin_pct: 40,
          percentage: 10
        }
      ],
      recommendations: [
        {
          id: 'coffee_bundle',
          title: 'Coffee Bundle Promotion',
          description: 'Bundle Sandwich + Coffee for $1 upgrade',
          impact: '+$1,200 margin',
          priority: 'high' as const,
          category: 'Coffee'
        },
        {
          id: 'dessert_discount',
          title: 'Dessert Combo Deal',
          description: 'Offer 10% off Dessert with every Burger',
          impact: '+$800 margin',
          priority: 'medium' as const,
          category: 'Desserts'
        },
        {
          id: 'drink_combo_hot',
          title: 'Cold Drink Promotion',
          description: 'Promote Cold Drink Combo with Fries',
          impact: '+$600 margin',
          priority: 'medium' as const,
          category: 'Drinks'
        }
      ],
      leaderboard: {
        topPerformer: { name: 'Sandwiches', value: '$5,000' },
        needsAttention: { name: 'Desserts', value: '$1,200' }
      },
      appliedRecommendations: new Set<string>(),
      currentScenario: 'Normal Day',
      isBeforeAfterMode: false,
      isLoading: false
    };
  }

  getDashboardData(): DashboardState {
    return { ...this.currentData };
  }

  applyRecommendation(recommendationId: string): DashboardState {
    if (this.currentData.appliedRecommendations.has(recommendationId)) {
      return this.currentData;
    }

    // Simulate applying recommendation
    this.currentData.appliedRecommendations.add(recommendationId);
    
    // Update relevant category based on recommendation
    const recommendation = this.currentData.recommendations.find(r => r.id === recommendationId);
    if (recommendation) {
      this.currentData.categories = this.currentData.categories.map(cat => {
        if (cat.name === recommendation.category) {
          return { ...cat, status: 'good' as const, sales: cat.sales * 1.2 };
        }
        return cat;
      });
    }

    return { ...this.currentData };
  }

  toggleBeforeAfter(): DashboardState {
    this.currentData.isBeforeAfterMode = !this.currentData.isBeforeAfterMode;
    return { ...this.currentData };
  }

  setScenario(scenario: DayScenario): DashboardState {
    this.currentData.currentScenario = scenario;
    // Adjust data based on scenario
    this.adjustDataForScenario(scenario);
    return { ...this.currentData };
  }

  private adjustDataForScenario(scenario: DayScenario): void {
    // Simulate different scenarios affecting the data
    const baseKpis = this.generateInitialData().kpis;
    
    switch (scenario) {
      case 'Normal Day':
        this.currentData.kpis = baseKpis;
        break;
      case 'Rainy Day':
        this.currentData.kpis = baseKpis.map(kpi => ({
          ...kpi,
          current: kpi.current * 0.8,
          value: kpi.id === 'sales' ? '$9,600' : 
                 kpi.id === 'tickets' ? '$6.80' : 
                 kpi.id === 'margin' ? '20%' : '79%'
        }));
        break;
      case 'Hot Day':
        this.currentData.kpis = baseKpis.map(kpi => ({
          ...kpi,
          current: kpi.current * 1.3,
          value: kpi.id === 'sales' ? '$15,600' : 
                 kpi.id === 'tickets' ? '$11.05' : 
                 kpi.id === 'margin' ? '25%' : '86%'
        }));
        break;
      case 'Staff Shortage':
        this.currentData.kpis = baseKpis.map(kpi => ({
          ...kpi,
          current: kpi.current * 0.75,
          value: kpi.id === 'sales' ? '$9,000' : 
                 kpi.id === 'tickets' ? '$6.38' : 
                 kpi.id === 'margin' ? '18%' : '75%'
        }));
        break;
      case 'Promo Running':
        this.currentData.kpis = baseKpis.map(kpi => ({
          ...kpi,
          current: kpi.current * 1.4,
          value: kpi.id === 'sales' ? '$16,800' : 
                 kpi.id === 'tickets' ? '$11.90' : 
                 kpi.id === 'margin' ? '19%' : '88%'
        }));
        break;
    }
  }

  resetToOriginal(): DashboardState {
    this.currentData = this.generateInitialData();
    return { ...this.currentData };
  }
}

export const mockDataService = new MockDataService();