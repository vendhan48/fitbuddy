import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FitnessProfilePage from './pages/FitnessProfilePage';
import GeneratePlanPage from './pages/GeneratePlanPage';
import DashboardPage from './pages/DashboardPage';
import WorkoutPage from './pages/WorkoutPage';
import NutritionPage from './pages/NutritionPage';
import ProgressPage from './pages/ProgressPage';
import AIAssistantPage from './pages/AIAssistantPage';

const AppContent: React.FC = () => {
  const { activeTab, user } = useAuth();

  const isPublicPage = activeTab === 'landing' || activeTab === 'login' || activeTab === 'register';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Public Pages Layout */}
      {isPublicPage ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            {activeTab === 'landing' && <LandingPage />}
            {activeTab === 'login' && <LoginPage />}
            {activeTab === 'register' && <RegisterPage />}
          </main>
          <Footer />
        </div>
      ) : (
        /* Dashboard & App Views Layout */
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
            
            {/* Top Bar on Dashboard views */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-base text-slate-900 capitalize tracking-tight">
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Logged in as</span>
                <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
                  {user?.name || 'Vendhan'}
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              {activeTab === 'dashboard' && <DashboardPage />}
              {activeTab === 'profile' && <FitnessProfilePage />}
              {activeTab === 'plan-generator' && <GeneratePlanPage />}
              {activeTab === 'workout' && <WorkoutPage />}
              {activeTab === 'nutrition' && <NutritionPage />}
              {activeTab === 'progress' && <ProgressPage />}
              {activeTab === 'ai-assistant' && <AIAssistantPage />}
            </main>
            
            <Footer />
          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
