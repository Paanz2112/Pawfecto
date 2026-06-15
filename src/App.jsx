import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import Toast from './components/ui/Toast';
import AlertPopup from './components/ui/AlertPopup';
import { Capacitor } from '@capacitor/core';

// Tabs
import DashboardTab from './features/dashboard/DashboardTab';
import PetsTab from './features/pets/PetsTab';
import HealthTab from './features/health/HealthTab';
import RemindersTab from './features/reminders/RemindersTab';
import VaccinationsTab from './features/vaccinations/VaccinationsTab';
import ExpensesTab from './features/expenses/ExpensesTab';
import SettingsTab from './features/settings/SettingsTab';
import GuideTab from './features/guide/GuideTab';

// Modals
import PetModal from './components/modals/PetModal';
import ExpenseModal from './components/modals/ExpenseModal';
import ReminderModal from './components/modals/ReminderModal';
import WeightModal from './components/modals/WeightModal';
import VaccineModal from './components/modals/VaccineModal';

function MainAppContent() {
  const { activeTab, loading } = useApp();
  const isNative = Capacitor.isNativePlatform();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-main)',
        gap: '1rem'
      }}>
        <div className="spinner-loader"></div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loading Pawfecto database...</p>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'pets': return <PetsTab />;
      case 'health': return <HealthTab />;
      case 'reminders': return <RemindersTab />;
      case 'vaccination': return <VaccinationsTab />;
      case 'expenses': return <ExpensesTab />;
      case 'settings': return <SettingsTab />;
      case 'guide': return <GuideTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className={`app-container ${isNative ? 'is-mobile-platform' : 'is-web-platform'}`}>
      {/* Toast Feedback */}
      <Toast />

      {/* Sidebar Navigation - only visible on web */}
      {!isNative && <Sidebar />}

      {/* Main Wrapper */}
      <main className="main-wrapper">
        {/* Header containing Filters and Action triggers */}
        <Header />

        {/* Current active view content */}
        <div className="tab-content-area">
          {renderActiveTab()}
        </div>
      </main>

      {/* Bottom Navigation - only visible on mobile native platforms */}
      {isNative && <BottomNav />}

      {/* Modal overlays and triggers */}
      <PetModal />
      <ExpenseModal />
      <ReminderModal />
      <WeightModal />
      <VaccineModal />
      <AlertPopup />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
