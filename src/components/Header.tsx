import React from 'react';
import { Menu, X, CloudRain, Bell } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <CloudRain className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">GeoAI Météo Admin</h1>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </header>
);

export default Header;
