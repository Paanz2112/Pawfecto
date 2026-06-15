import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, PawPrint, HeartPulse, Receipt, Settings } from 'lucide-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  const handleTabClick = async (tabName) => {
    setActiveTab(tabName);
    
    // Trigger haptic feedback on native devices
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style: ImpactStyle.Light });
      } catch (e) {
        console.error("Haptics not available", e);
      }
    }
  };

  const navItems = [
    { id: 'dashboard', icon: <Home size={24} />, label: 'Home' },
    { id: 'pets', icon: <PawPrint size={24} />, label: 'Pets' },
    { id: 'health', icon: <HeartPulse size={24} />, label: 'Health' },
    { id: 'expenses', icon: <Receipt size={24} />, label: 'Expenses' },
    { id: 'settings', icon: <Settings size={24} />, label: 'Settings' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleTabClick(item.id)}
          >
            <div className="icon-wrapper">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
