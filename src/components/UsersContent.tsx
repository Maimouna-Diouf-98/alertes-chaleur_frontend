import React from 'react';
import { Plus, Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import AddUserForm from './forms/AddUsersForm';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  region: string;
}

const UsersContent: React.FC = () => {
  const mockUsers: User[] = [
    { id: 1, name: 'Amadou Diallo', email: 'amadou@example.com', role: 'Agriculteur', status: 'Actif', lastLogin: '2024-07-19', region: 'Dakar' },
    { id: 2, name: 'Fatou Sall', email: 'fatou@example.com', role: 'Pêcheur', status: 'Actif', lastLogin: '2024-07-18', region: 'Saint-Louis' },
    { id: 3, name: 'Ibrahima Kane', email: 'ibrahima@example.com', role: 'Météorologue', status: 'Inactif', lastLogin: '2024-07-15', region: 'Thiès' },
    { id: 4, name: 'Awa Ndiaye', email: 'awa@example.com', role: 'Agriculteur', status: 'Actif', lastLogin: '2024-07-19', region: 'Kaolack' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
        <AddUserForm />
      </div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              <span>Filtres</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={16} />
            <span>Exporter</span>
          </button>
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Utilisateur</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Rôle</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Région</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Dernière connexion</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{user.role}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{user.region}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{user.lastLogin}</td>
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

export default UsersContent;
