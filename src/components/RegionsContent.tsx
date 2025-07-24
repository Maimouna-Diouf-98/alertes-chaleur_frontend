import React from 'react';
import { Plus, Eye, Edit, Trash2, MapPin, Map } from 'lucide-react';

const mockRegions = [
  { id: 1, name: 'Dakar', code: 'DK', stations: 15, status: 'Actif', coverage: '98%', lastUpdate: '2024-07-19 14:30' },
  { id: 2, name: 'Saint-Louis', code: 'SL', stations: 8, status: 'Actif', coverage: '95%', lastUpdate: '2024-07-19 14:25' },
  { id: 3, name: 'Thiès', code: 'TH', stations: 12, status: 'Actif', coverage: '92%', lastUpdate: '2024-07-19 14:20' },
  { id: 4, name: 'Kaolack', code: 'KL', stations: 6, status: 'Maintenance', coverage: '87%', lastUpdate: '2024-07-19 12:15' }
];

const RegionsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Régions</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Ajouter une région</span>
        </button>
      </div>
      {/* Regions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Régions Actives</p>
              <p className="text-2xl font-bold text-gray-900">14</p>
            </div>
            <Map className="text-blue-600" size={24} />
          </div>
        </div>
        {/* Add more overview cards here */}
      </div>
      {/* Regions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Liste des Régions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Région</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Code</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Stations</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Couverture</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Dernière MAJ</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockRegions.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="text-gray-400" size={16} />
                      <span className="font-medium text-gray-900">{region.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.code}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.stations}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.coverage}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      region.status === 'Actif' ? 'bg-green-100 text-green-800' :
                      region.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {region.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.lastUpdate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye size={16} className="text-gray-600" />
                      </button>
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
    </div>
  );
};

export default RegionsContent;
