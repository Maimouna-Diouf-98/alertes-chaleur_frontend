import React from 'react';
import { Plus, CheckCircle, AlertCircle, CloudRain, Activity, TrendingUp } from 'lucide-react';
import AddWeatherSourceForm from './forms/AddWeatherSoureForm';

const WeatherContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Données Météo</h2>
        <AddWeatherSourceForm />
      </div>
      {/* Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources de Données</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">API Météo Nationale</p>
                  <p className="text-sm text-gray-600">Dernière sync: Il y a 5 min</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Stations Automatiques</p>
                  <p className="text-sm text-gray-600">Dernière sync: Il y a 2 min</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-medium">Actif</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-yellow-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Satellite METEOSAT</p>
                  <p className="text-sm text-gray-600">Dernière sync: Il y a 45 min</p>
                </div>
              </div>
              <span className="text-yellow-600 text-sm font-medium">Délai</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation des Données</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Données validées aujourd'hui</span>
              <span className="font-medium">2,847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Anomalies détectées</span>
              <span className="font-medium text-red-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Taux de précision</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Data */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Données Récentes</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CloudRain className="mx-auto text-blue-600 mb-2" size={32} />
              <p className="text-lg font-bold text-gray-900">85%</p>
              <p className="text-sm text-gray-600">Humidité moyenne</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Activity className="mx-auto text-yellow-600 mb-2" size={32} />
              <p className="text-lg font-bold text-gray-900">28°C</p>
              <p className="text-sm text-gray-600">Température moyenne</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="mx-auto text-green-600 mb-2" size={32} />
              <p className="text-lg font-bold text-gray-900">15 km/h</p>
              <p className="text-sm text-gray-600">Vitesse du vent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherContent;
