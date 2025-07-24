import React from 'react';
import { LayoutDashboard, Users, CloudRain, AlertTriangle, Map, BarChart3, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  count: number | null;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, sidebarOpen }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', count: null },
    { id: 'users', icon: Users, label: 'Utilisateurs', count: 1247 },
    { id: 'weather', icon: CloudRain, label: 'Données Météo', count: null },
    { id: 'alerts', icon: AlertTriangle, label: 'Alertes', count: 5 },
    { id: 'regions', icon: Map, label: 'Régions', count: 14 },
    { id: 'reports', icon: BarChart3, label: 'Rapports', count: null },
    { id: 'settings', icon: Settings, label: 'Paramètres', count: null }
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2'} py-3 text-left rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="ml-3 font-medium">{item.label}</span>
                  {item.count && (
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
