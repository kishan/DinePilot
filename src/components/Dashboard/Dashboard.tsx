import React from 'react';
import { motion } from 'framer-motion';
import { DashboardProvider } from '../../hooks/useDashboardState';
import { DashboardHeader } from './DashboardHeader';
import { KPIRow } from './KPIRow';
import { MainGrid } from './MainGrid';
import { Leaderboard } from './Leaderboard';
import { containerVariants } from '../../utils/animations';

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <motion.div
          className="container mx-auto px-4 py-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DashboardHeader />
          <KPIRow />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <MainGrid />
            </div>
            <div className="lg:col-span-1">
              <Leaderboard />
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;