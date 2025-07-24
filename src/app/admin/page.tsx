'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Users,
  CloudRain,
  AlertTriangle,
  Map,
  BarChart3,
  Settings,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  Search,
  ChevronRight,
  Home,
  Bell,
  TrendingUp,
  Activity,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  UserPlus,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const GeoAIAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [errorUsers, setErrorUsers] = useState(null);
  const [loadingAlert, setLoadingAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  const userEvolutionChartRef = useRef(null);
  const regionDistributionChartRef = useRef(null);

  const [users, setUsers] = useState([
    { id: 1, name: 'Amadou Diallo', email: 'amadou@example.com', role: 'Agriculteur', status: 'Actif', lastLogin: '2024-07-19', region: 'Dakar', phone: '+221 77 123 45 67' },
    { id: 2, name: 'Fatou Sall', email: 'fatou@example.com', role: 'Pêcheur', status: 'Actif', lastLogin: '2024-07-18', region: 'Saint-Louis', phone: '+221 77 987 65 43' },
    { id: 3, name: 'Ibrahima Kane', email: 'ibrahima@example.com', role: 'Météorologue', status: 'Inactif', lastLogin: '2024-07-15', region: 'Thiès', phone: '+221 77 555 44 33' },
    { id: 4, name: 'Awa Ndiaye', email: 'awa@example.com', role: 'Agriculteur', status: 'Actif', lastLogin: '2024-07-19', region: 'Kaolack', phone: '+221 77 222 11 00' }
  ]);

  const [regions, setRegions] = useState([
    { id: 1, name: 'Dakar', code: 'DK', stations: 15, status: 'Actif', coverage: '98%', lastUpdate: '2024-07-19 14:30', population: 3500000 },
    { id: 2, name: 'Saint-Louis', code: 'SL', stations: 8, status: 'Actif', coverage: '95%', lastUpdate: '2024-07-19 14:25', population: 1200000 },
    { id: 3, name: 'Thiès', code: 'TH', stations: 12, status: 'Actif', coverage: '92%', lastUpdate: '2024-07-19 14:20', population: 2000000 },
    { id: 4, name: 'Kaolack', code: 'KL', stations: 6, status: 'Maintenance', coverage: '87%', lastUpdate: '2024-07-19 12:15', population: 800000 }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Pluie forte', region: 'Dakar', threshold: '50mm/h', status: 'Actif', created: '2024-07-19', priority: 'Haute', message: 'Risque d\'inondation élevé' },
    { id: 2, type: 'Vent fort', region: 'Saint-Louis', threshold: '60km/h', status: 'Actif', created: '2024-07-18', priority: 'Moyenne', message: 'Conditions de pêche difficiles' },
    { id: 3, type: 'Température élevée', region: 'Kaolack', threshold: '40°C', status: 'Inactif', created: '2024-07-17', priority: 'Basse', message: 'Canicule prévue' }
  ]);

  const [settings, setSettings] = useState({
    appName: 'GeoAI Météo',
    timezone: 'GMT (Dakar, Sénégal)',
    language: 'Français',
    updateFrequency: '5 minutes',
    apiLimit: 1000,
    apiTimeout: 30,
    sessionDuration: '8 heures',
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: true,
    activityLogs: true
  });

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://alertes-chaleur-backend.onrender.com/utilisateurs/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setErrorUsers(error.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fonction pour envoyer une alerte
  const sendAlert = async (alertData) => {
    setLoadingAlert(true);
    setErrorAlert(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://alertes-chaleur-backend.onrender.com/alerte/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertData),
      });
      if (!response.ok) {
        throw new Error('Failed to send alert');
      }
      const data = await response.json();
      console.log('Alert sent successfully:', data);
    } catch (error) {
      setErrorAlert(error.message);
    } finally {
      setLoadingAlert(false);
    }
  };

  // Calcul des statistiques dynamiques
  const getStats = () => {
    const activeUsers = users.filter(user => user.status === 'Actif').length;
    const totalStations = regions.reduce((sum, region) => sum + region.stations, 0);
    const activeAlerts = alerts.filter(alert => alert.status === 'Actif').length;
    const avgCoverage = regions.reduce((sum, region) => sum + parseFloat(region.coverage), 0) / regions.length;
    return {
      activeUsers,
      totalStations,
      activeAlerts,
      avgCoverage: avgCoverage.toFixed(1)
    };
  };

  const stats = getStats();

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', count: null },
    { id: 'users', icon: Users, label: 'Utilisateurs', count: users.length },
    { id: 'weather', icon: CloudRain, label: 'Données Météo', count: null },
    { id: 'alerts', icon: AlertTriangle, label: 'Alertes', count: stats.activeAlerts },
    { id: 'regions', icon: Map, label: 'Régions', count: regions.length },
    { id: 'reports', icon: BarChart3, label: 'Rapports', count: null },
    { id: 'settings', icon: Settings, label: 'Paramètres', count: null }
  ];

  // Breadcrumb data
  const breadcrumbs = {
    dashboard: [{ label: 'Dashboard', href: '#' }],
    users: [{ label: 'Dashboard', href: '#' }, { label: 'Utilisateurs', href: '#' }],
    weather: [{ label: 'Dashboard', href: '#' }, { label: 'Données Météo', href: '#' }],
    alerts: [{ label: 'Dashboard', href: '#' }, { label: 'Configuration Alertes', href: '#' }],
    regions: [{ label: 'Dashboard', href: '#' }, { label: 'Gestion Régions', href: '#' }],
    reports: [{ label: 'Dashboard', href: '#' }, { label: 'Rapports & Analytics', href: '#' }],
    settings: [{ label: 'Dashboard', href: '#' }, { label: 'Paramètres Système', href: '#' }]
  };

  // Fonctions CRUD
  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      lastLogin: new Date().toISOString().split('T')[0],
      status: 'Actif'
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id, userData) => {
    setUsers(users.map(user => user.id === id ? { ...user, ...userData } : user));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const addRegion = (regionData) => {
    const newRegion = {
      id: Date.now(),
      ...regionData,
      lastUpdate: new Date().toLocaleString('fr-FR'),
      status: 'Actif'
    };
    setRegions([...regions, newRegion]);
  };

  const updateRegion = (id, regionData) => {
    setRegions(regions.map(region => region.id === id ? { ...region, ...regionData } : region));
  };

  const deleteRegion = (id) => {
    setRegions(regions.filter(region => region.id !== id));
  };

  const addAlert = (alertData) => {
    const newAlert = {
      id: Date.now(),
      ...alertData,
      created: new Date().toISOString().split('T')[0],
      status: 'Actif'
    };
    setAlerts([...alerts, newAlert]);
    sendAlert(alertData);
  };

  const updateAlert = (id, alertData) => {
    setAlerts(alerts.map(alert => alert.id === id ? { ...alert, ...alertData } : alert));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlertStatus = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id
        ? { ...alert, status: alert.status === 'Actif' ? 'Inactif' : 'Actif' }
        : alert
    ));
  };

  // Formulaires
  const UserForm = ({ user, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(user || {
      name: '',
      email: '',
      phone: '',
      role: 'Agriculteur',
      region: 'Dakar'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Agriculteur">Agriculteur</option>
            <option value="Pêcheur">Pêcheur</option>
            <option value="Météorologue">Météorologue</option>
            <option value="Administrateur">Administrateur</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
          <select
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region.id} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {user ? 'Modifier' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    );
  };

  const RegionForm = ({ region, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(region || {
      name: '',
      code: '',
      stations: 0,
      coverage: '',
      population: 0
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la région</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code région</label>
          <input
            type="text"
            required
            value={formData.code}
            onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de stations</label>
          <input
            type="number"
            required
            min="0"
            value={formData.stations}
            onChange={(e) => setFormData({...formData, stations: parseInt(e.target.value) || 0})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Couverture (%)</label>
          <input
            type="number"
            required
            min="0"
            max="100"
            value={formData.coverage.replace('%', '')}
            onChange={(e) => setFormData({...formData, coverage: e.target.value + '%'})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Population</label>
          <input
            type="number"
            value={formData.population}
            onChange={(e) => setFormData({...formData, population: parseInt(e.target.value) || 0})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {region ? 'Modifier' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    );
  };

  const AlertForm = ({ alert, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(alert || {
      type: 'Pluie forte',
      region: 'Dakar',
      threshold: '',
      priority: 'Moyenne',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type d'alerte</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Pluie forte">Pluie forte</option>
            <option value="Vent fort">Vent fort</option>
            <option value="Température élevée">Température élevée</option>
            <option value="Température basse">Température basse</option>
            <option value="Orage">Orage</option>
            <option value="Brouillard">Brouillard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
          <select
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region.id} value={region.name}>{region.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seuil de déclenchement</label>
          <input
            type="text"
            required
            placeholder="ex: 50mm/h, 40°C, 60km/h"
            value={formData.threshold}
            onChange={(e) => setFormData({...formData, threshold: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({...formData, priority: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Haute">Haute</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message d'alerte</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Message qui sera envoyé aux utilisateurs..."
          />
        </div>
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {alert ? 'Modifier' : 'Ajouter'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    );
  };

  // Modal Component
  const Modal = ({ isOpen, title, children, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Header Component
  const Header = () => (
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
            <h1 className="text-xl font-bold text-gray-900">{settings.appName} Admin</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            {stats.activeAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {stats.activeAlerts}
              </span>
            )}
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );

  // Sidebar Component
  const Sidebar = () => (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2'} py-3 text-left rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {sidebarOpen && (
              <>
                <span className="ml-3 font-medium">{item.label}</span>
                {item.count !== null && (
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );

  // Breadcrumb Component
  const Breadcrumb = ({ items }) => (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Home size={16} />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} />
          <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700 cursor-pointer'}>
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );

  // Dashboard Content
  const DashboardContent = () => {
    const handleAddAlert = () => {
      setModalType('alert');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditAlert = (alert) => {
      setModalType('alert');
      setEditingItem(alert);
      setShowModal(true);
    };

    const handleDeleteAlert = (id) => {
      deleteAlert(id);
    };

    const handleSubmitAlert = (alertData) => {
      if (editingItem) {
        updateAlert(editingItem.id, alertData);
      } else {
        addAlert(alertData);
      }
    };

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                <p className="text-sm text-green-600">+{Math.round((stats.activeUsers / users.length) * 100)}% actifs</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stations Météo</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStations}</p>
                <p className="text-sm text-green-600">{regions.length} régions</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alertes Actives</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeAlerts}</p>
                <p className="text-sm text-red-600">{alerts.filter(a => a.priority === 'Haute').length} haute priorité</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Couverture Moyenne</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgCoverage}%</p>
                <p className="text-sm text-green-600">Excellente couverture</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>
        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Alertes Récentes</h3>
            <button
              onClick={handleAddAlert}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Nouvelle alerte
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.priority === 'Haute' ? 'bg-red-500' :
                      alert.priority === 'Moyenne' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{alert.type}</p>
                      <p className="text-sm text-gray-600">{alert.region} - Seuil: {alert.threshold}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      alert.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditAlert(alert)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Trash2 size={14} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Modal for Alerts */}
        <Modal
          isOpen={showModal && modalType === 'alert'}
          title={editingItem ? 'Modifier Alerte' : 'Nouvelle Alerte'}
          onClose={() => setShowModal(false)}
        >
          <AlertForm
            alert={editingItem}
            onSubmit={handleSubmitAlert}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      </div>
    );
  };

  // Users Management Content
  const UsersContent = () => {
    useEffect(() => {
      fetchUsers();
    }, []);

    const handleAddUser = () => {
      setModalType('user');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditUser = (user) => {
      setModalType('user');
      setEditingItem(user);
      setShowModal(true);
    };

    const handleDeleteUser = (id) => {
      deleteUser(id);
    };

    const handleSubmitUser = (userData) => {
      if (editingItem) {
        updateUser(editingItem.id, userData);
      } else {
        addUser(userData);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Ajouter un utilisateur</span>
          </button>
        </div>
        {loadingUsers && <p>Chargement des utilisateurs...</p>}
        {errorUsers && <p className="text-red-500">Erreur: {errorUsers}</p>}
        {/* Filtres */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  <option value="">Tous les rôles</option>
                  <option value="Agriculteur">Agriculteur</option>
                  <option value="Pêcheur">Pêcheur</option>
                  <option value="Météorologue">Météorologue</option>
                  <option value="Administrateur">Administrateur</option>
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={16} />
              <span>Exporter</span>
            </button>
          </div>
        </div>
        {/* Tableau des Utilisateurs */}
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
                {users
                  .filter(user =>
                    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (filterRole === '' || user.role === filterRole)
                  )
                  .map((user) => (
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
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Edit size={16} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
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
        {/* Modal pour les Utilisateurs */}
        <Modal
          isOpen={showModal && modalType === 'user'}
          title={editingItem ? 'Modifier Utilisateur' : 'Nouvel Utilisateur'}
          onClose={() => setShowModal(false)}
        >
          <UserForm
            user={editingItem}
            onSubmit={handleSubmitUser}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      </div>
    );
  };

  // Weather Data Management Content
  const WeatherContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestion des Données Météo</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Ajouter une source</span>
        </button>
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

  // Alerts Configuration Content
  const AlertsContent = () => {
    const handleAddAlert = () => {
      setModalType('alert');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditAlert = (alert) => {
      setModalType('alert');
      setEditingItem(alert);
      setShowModal(true);
    };

    const handleDeleteAlert = (id) => {
      deleteAlert(id);
    };

    const handleToggleStatus = (id) => {
      toggleAlertStatus(id);
    };

    const handleSubmitAlert = (alertData) => {
      if (editingItem) {
        updateAlert(editingItem.id, alertData);
      } else {
        addAlert(alertData);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Configuration des Alertes</h2>
          <button
            onClick={handleAddAlert}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nouvelle alerte</span>
          </button>
        </div>
        {/* Active Alerts */}
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
                {alerts.map((alert) => (
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
                      <button
                        onClick={() => handleToggleStatus(alert.id)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          alert.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {alert.status}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditAlert(alert)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
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
        {/* Alert Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertes par Priorité</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Haute</span>
                </div>
                <span className="font-medium">{alerts.filter(a => a.priority === 'Haute').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Moyenne</span>
                </div>
                <span className="font-medium">{alerts.filter(a => a.priority === 'Moyenne').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Basse</span>
                </div>
                <span className="font-medium">{alerts.filter(a => a.priority === 'Basse').length}</span>
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
        {/* Modal for Alerts */}
        <Modal
          isOpen={showModal && modalType === 'alert'}
          title={editingItem ? 'Modifier Alerte' : 'Nouvelle Alerte'}
          onClose={() => setShowModal(false)}
        >
          <AlertForm
            alert={editingItem}
            onSubmit={handleSubmitAlert}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      </div>
    );
  };

  // Regions Management Content
  const RegionsContent = () => {
    const handleAddRegion = () => {
      setModalType('region');
      setEditingItem(null);
      setShowModal(true);
    };

    const handleEditRegion = (region) => {
      setModalType('region');
      setEditingItem(region);
      setShowModal(true);
    };

    const handleDeleteRegion = (id) => {
      deleteRegion(id);
    };

    const handleSubmitRegion = (regionData) => {
      if (editingItem) {
        updateRegion(editingItem.id, regionData);
      } else {
        addRegion(regionData);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Régions</h2>
          <button
            onClick={handleAddRegion}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
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
                <p className="text-2xl font-bold text-gray-900">{regions.filter(r => r.status === 'Actif').length}</p>
              </div>
              <Map className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stations Totales</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStations}</p>
              </div>
              <MapPin className="text-green-600" size={24} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Couverture Moyenne</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgCoverage}%</p>
              </div>
              <Activity className="text-purple-600" size={24} />
            </div>
          </div>
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
                {regions.map((region) => (
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
                        <button
                          onClick={() => handleEditRegion(region)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteRegion(region.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
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
        {/* Modal for Regions */}
        <Modal
          isOpen={showModal && modalType === 'region'}
          title={editingItem ? 'Modifier Région' : 'Nouvelle Région'}
          onClose={() => setShowModal(false)}
        >
          <RegionForm
            region={editingItem}
            onSubmit={handleSubmitRegion}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      </div>
    );
  };

  // Reports and Analytics Content
  const ReportsContent = () => {
  const userEvolutionChartRef = useRef(null);
  const regionDistributionChartRef = useRef(null);
  const [userEvolutionChart, setUserEvolutionChart] = useState(null);
  const [regionDistributionChart, setRegionDistributionChart] = useState(null);

  useEffect(() => {
    // Détruire les graphiques existants avant de les recréer
    if (userEvolutionChart) {
      userEvolutionChart.destroy();
    }
    if (regionDistributionChart) {
      regionDistributionChart.destroy();
    }

    // Création du graphique d'évolution des utilisateurs
    const userEvolutionCtx = userEvolutionChartRef.current.getContext('2d');
    const newUserEvolutionChart = new Chart(userEvolutionCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
        datasets: [{
          label: 'Utilisateurs',
          data: [100, 150, 200, 250, 300, 350, 400],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Évolution des Utilisateurs'
          }
        }
      }
    });

    // Création du graphique de répartition par région
    const regionDistributionCtx = regionDistributionChartRef.current.getContext('2d');
    const newRegionDistributionChart = new Chart(regionDistributionCtx, {
      type: 'pie',
      data: {
        labels: ['Dakar', 'Saint-Louis', 'Thiès', 'Kaolack'],
        datasets: [{
          label: 'Répartition par Région',
          data: [3500000, 1200000, 2000000, 800000],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Répartition par Région'
          }
        }
      }
    });

    // Stocker les instances des graphiques dans l'état
    setUserEvolutionChart(newUserEvolutionChart);
    setRegionDistributionChart(newRegionDistributionChart);

    // Nettoyer les graphiques lorsque le composant est démonté
    return () => {
      if (newUserEvolutionChart) {
        newUserEvolutionChart.destroy();
      }
      if (newRegionDistributionChart) {
        newRegionDistributionChart.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Rapports & Analytics</h2>
        <div className="flex space-x-3">
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
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Utilisateurs Actifs</h3>
            <TrendingUp className="text-green-500" size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">400</p>
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
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-sm text-red-600">+15.3% vs semaine dernière</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des Utilisateurs</h3>
          <div className="h-64">
            <canvas ref={userEvolutionChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par Région</h3>
          <div className="h-64">
            <canvas ref={regionDistributionChartRef}></canvas>
          </div>
        </div>
      </div>
      {/* Performance Table */}
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
              {[
                { id: 1, name: 'Dakar', users: 150, consultations: 1200, precision: 95.5, satisfaction: 4.5 },
                { id: 2, name: 'Saint-Louis', users: 80, consultations: 850, precision: 92.3, satisfaction: 4.2 },
                { id: 3, name: 'Thiès', users: 120, consultations: 1000, precision: 94.7, satisfaction: 4.7 },
                { id: 4, name: 'Kaolack', users: 50, consultations: 600, precision: 90.1, satisfaction: 4.1 }
              ].map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{region.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.users}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.consultations}</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.precision}%</td>
                  <td className="py-4 px-6 text-sm text-gray-600">{region.satisfaction}/5</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

  // System Settings Content
  const SettingsContent = () => {
    const [formData, setFormData] = useState({...settings});

    const handleSubmit = (e) => {
      e.preventDefault();
      setSettings(formData);
      alert('Paramètres sauvegardés avec succès!');
    };

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    return (
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres Système</h2>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Sauvegarder</span>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres Généraux</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'application
                  </label>
                  <input
                    type="text"
                    name="appName"
                    value={formData.appName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuseau horaire
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>GMT (Dakar, Sénégal)</option>
                    <option>UTC+1 (Paris)</option>
                    <option>UTC-5 (New York)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Langue par défaut
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Français</option>
                    <option>Wolof</option>
                    <option>Anglais</option>
                  </select>
                </div>
              </div>
            </div>
            {/* API Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration API</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fréquence de mise à jour
                  </label>
                  <select
                    name="updateFrequency"
                    value={formData.updateFrequency}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 heure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Limite de requêtes/heure
                  </label>
                  <input
                    type="number"
                    name="apiLimit"
                    value={formData.apiLimit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout API (secondes)
                  </label>
                  <input
                    type="number"
                    name="apiTimeout"
                    value={formData.apiTimeout}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications SMS</p>
                    <p className="text-sm text-gray-600">Envoyer des alertes par SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications Email</p>
                    <p className="text-sm text-gray-600">Envoyer des rapports par email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Notifications Push</p>
                    <p className="text-sm text-gray-600">Notifications mobiles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            {/* Security Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée de session
                  </label>
                  <select
                    name="sessionDuration"
                    value={formData.sessionDuration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>2 heures</option>
                    <option>8 heures</option>
                    <option>24 heures</option>
                    <option>7 jours</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Authentification 2FA</p>
                    <p className="text-sm text-gray-600">Sécurité renforcée</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactor"
                      checked={formData.twoFactor}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Logs d'activité</p>
                    <p className="text-sm text-gray-600">Enregistrer les actions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="activityLogs"
                      checked={formData.activityLogs}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">État du Système</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Base de données</p>
                  <p className="text-sm text-gray-600">Opérationnelle</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="text-green-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">API Météo</p>
                  <p className="text-sm text-gray-600">Connectée</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertCircle className="text-yellow-500" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Stockage</p>
                  <p className="text-sm text-gray-600">78% utilisé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Content renderer based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'users': return <UsersContent />;
      case 'weather': return <WeatherContent />;
      case 'alerts': return <AlertsContent />;
      case 'regions': return <RegionsContent />;
      case 'reports': return <ReportsContent />;
      case 'settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbs[activeTab]} />
            {/* Page Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeoAIAdminDashboard;
