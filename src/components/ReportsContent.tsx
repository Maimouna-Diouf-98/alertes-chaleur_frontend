import React from 'react';
import { Calendar, Download, TrendingUp, BarChart3, Activity, Bell } from 'lucide-react';
import AddReportForm from './forms/AddReportForm';

interface Region {
  id: number;
  name: string;
  code: string;
  stations: number;
  status: string;
  coverage: string;
  lastUpdate: string;
}

const ReportsContent: React.FC = () => {
  const mockRegions: Region[] = [
    { id: 1, name: 'Dakar', code: 'DK', stations: 15, status: 'Actif', coverage: '98%', lastUpdate: '2024-07-19 14:30' },
    { id: 2, name: 'Saint-Louis', code: 'SL', stations: 8, status: 'Actif', coverage: '95%', lastUpdate: '2024-07-19 14:25' },
    { id: 3, name: 'Thiès', code: 'TH', stations: 12, status: 'Actif', coverage: '92%', lastUpdate: '2024-07-19 14:20' },
    { id: 4, name: 'Kaolack', code: 'KL', stations: 6, status: 'Maintenance', coverage: '87%', lastUpdate: '2024-07-19 12:15' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Rapports & Analytics</h2>
        <div className="flex space-x-3">
          <AddReportForm />
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Calendar size={16} />
            <span>Période</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Utilisateurs Actifs</h3>
            <TrendingUp className="text-green-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-green-600">+8.2% vs mois dernier</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Consultations</h3>
            <BarChart3 className="text-blue-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">15,823</p>
          <p className="text-sm text-blue-600">+12.4% vs mois dernier</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Précision IA</h3>
            <Activity className="text-purple-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">94.2%</p>
          <p className="text-sm text-green-600">+1.5% amélioration</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Alertes Envoyées</h3>
            <Bell className="text-yellow-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">284</p>
          <p className="text-sm text-red-600">+15.3% vs semaine dernière</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Utilisateurs</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Graphique d'évolution des utilisateurs</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par Région</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Graphique de répartition géographique</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Performance par Région</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Région</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Utilisateurs</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Consultations</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Précision</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Satisfaction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockRegions.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{region.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{Math.floor(Math.random() * 200 + 50)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{Math.floor(Math.random() * 2000 + 500)}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{(Math.random() * 5 + 90).toFixed(1)}%</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{(Math.random() * 1 + 4).toFixed(1)}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsContent;
