import React from 'react';
import { Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Données pour le graphique
const userActivityData = [
  { name: 'Jan', utilisateurs: 400 },
  { name: 'Fév', utilisateurs: 300 },
  { name: 'Mar', utilisateurs: 600 },
  { name: 'Avr', utilisateurs: 800 },
  { name: 'Mai', utilisateurs: 500 },
  { name: 'Juin', utilisateurs: 900 },
];

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600">+12% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        {/* Ajoutez d'autres cartes ici */}
      </div>

      {/* Graphique et Activité Récent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Utilisateurs</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={userActivityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="utilisateurs" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Ajoutez d'autres graphiques ici */}
      </div>
    </div>
  );
};

export default DashboardContent;
