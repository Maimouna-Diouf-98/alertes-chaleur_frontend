import React from 'react';
import { Plus, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import AddAlertForm from './forms/AddAlertForm';

interface Alert {
  id: number;
  type: string;
  region: string;
  threshold: string;
  status: string;
  created: string;
  priority: string;
}

const AlertsContent: React.FC = () => {
  const mockAlerts: Alert[] = [
    { id: 1, type: 'Pluie forte', region: 'Dakar', threshold: '50mm/h', status: 'Actif', created: '2024-07-19', priority: 'Haute' },
    { id: 2, type: 'Vent fort', region: 'Saint-Louis', threshold: '60km/h', status: 'Actif', created: '2024-07-18', priority: 'Moyenne' },
    { id: 3, type: 'Température élevée', region: 'Kaolack', threshold: '40°C', status: 'Inactif', created: '2024-07-17', priority: 'Basse' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Configuration des Alertes</h2>
        <AddAlertForm />
      </div>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Alertes Configurées</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Type d'alerte</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Région</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Seuil</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Priorité</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="text-yellow-500" size={16} />
                      <span className="font-medium text-gray-900">{alert.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{alert.region}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{alert.threshold}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.priority === 'Haute' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes par Priorité</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Haute</span>
              </div>
              <span className="font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Moyenne</span>
              </div>
              <span className="font-medium">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Basse</span>
              </div>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications Envoyées</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Aujourd'hui</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Cette semaine</span>
              <span className="font-medium">284</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Ce mois</span>
              <span className="font-medium">1,152</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Canaux de Notification</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">SMS</span>
              <span className="text-green-600 font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Email</span>
              <span className="text-green-600 font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Push</span>
              <span className="text-green-600 font-medium">Actif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsContent;
