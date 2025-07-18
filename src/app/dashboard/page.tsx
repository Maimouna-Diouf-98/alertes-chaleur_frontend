'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MapPin, Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';

// Senegalese locations data
const senegalLocations = [
  { name: "Dakar", type: "coastal", avgHotSeasonTemp: 32, forecastVariance: 4, coords: [14.6928, -17.4467] },
  { name: "Thiès", type: "inland", avgHotSeasonTemp: 34, forecastVariance: 5, coords: [14.7833, -16.9333] },
  { name: "Rufisque", type: "coastal", avgHotSeasonTemp: 32, forecastVariance: 4, coords: [14.7175, -17.2661] },
  { name: "Kaolack", type: "inland", avgHotSeasonTemp: 36, forecastVariance: 6, coords: [14.1333, -16.0833] },
  { name: "Ziguinchor", type: "southern", avgHotSeasonTemp: 31, forecastVariance: 3, coords: [12.5667, -16.2667] },
  { name: "Saint-Louis", type: "coastal", avgHotSeasonTemp: 33, forecastVariance: 4, coords: [16.0167, -16.5000] },
  { name: "Diourbel", type: "inland", avgHotSeasonTemp: 35, forecastVariance: 5, coords: [14.6500, -16.2333] },
  { name: "Tambacounda", type: "inland-extreme", avgHotSeasonTemp: 38, forecastVariance: 7, coords: [13.7667, -13.6667] },
  { name: "Kolda", type: "southern", avgHotSeasonTemp: 32, forecastVariance: 4, coords: [12.8833, -14.9500] },
  { name: "Fatick", type: "inland", avgHotSeasonTemp: 34, forecastVariance: 5, coords: [14.3333, -16.4167] },
  { name: "Matam", type: "inland-extreme", avgHotSeasonTemp: 39, forecastVariance: 8, coords: [15.6667, -13.2500] },
  { name: "Kédougou", type: "inland", avgHotSeasonTemp: 37, forecastVariance: 6, coords: [12.5500, -12.1833] },
  { name: "Louga", type: "inland", avgHotSeasonTemp: 35, forecastVariance: 5, coords: [15.6167, -16.2167] },
  { name: "Sédhiou", type: "southern", avgHotSeasonTemp: 31, forecastVariance: 4, coords: [12.7000, -15.5500] },
  { name: "Kaffrine", type: "inland", avgHotSeasonTemp: 35, forecastVariance: 5, coords: [14.1000, -15.5500] }
];

// Weather Map Component
const WeatherMap = ({ onLocationSelect, selectedLocation }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return;

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => {
      if (mapRef.current && !leafletMapRef.current) {
        leafletMapRef.current = window.L.map(mapRef.current).setView([14.4974, -14.4524], 7);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(leafletMapRef.current);

        // Add markers
        senegalLocations.forEach(loc => {
          const marker = window.L.marker(loc.coords).addTo(leafletMapRef.current);
          marker.bindPopup(`<b>${loc.name}</b><br/>Cliquez pour sélectionner`);
          marker.on('click', () => {
            onLocationSelect(loc.name);
            leafletMapRef.current.panTo(loc.coords);
          });
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [onLocationSelect]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Carte du Sénégal
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="h-[calc(100vh-200px)] w-full rounded-b-lg"
        />
      </CardContent>
    </Card>
  );
};

// Weather Prediction Component
const WeatherPrediction = ({ prediction, advice, isLoading }) => {
  if (!prediction && !isLoading) return null;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Prévisions Météo
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2">Chargement des prévisions...</span>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-lg text-white font-semibold ${
              prediction.status === 'hot' ? 'bg-red-500' : 'bg-green-500'
            }`}>
              <div className="flex items-center justify-center text-center">
                {prediction.status === 'hot' ? (
                  <AlertTriangle className="h-6 w-6 mr-2" />
                ) : (
                  <CheckCircle className="h-6 w-6 mr-2" />
                )}
                <div>
                  <div className="text-lg font-bold">
                    {prediction.status === 'hot' 
                      ? `${prediction.type === 'current' ? 'Alerte Canicule !' : 'Canicule Prévue !'}`
                      : 'Météo Normale'
                    }
                  </div>
                  <div className="text-sm">
                    Température: {prediction.displayTemperature}
                  </div>
                </div>
              </div>
            </div>

            {/* Advice for current hot weather */}
            {prediction.status === 'hot' && prediction.type === 'current' && advice && (
              <Alert className="mt-4 border-yellow-300 bg-yellow-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Conseils pour la Canicule :</strong>
                  <div className="mt-2 whitespace-pre-wrap">{advice}</div>
                </AlertDescription>
              </Alert>
            )}

            {/* Detailed forecast for future dates */}
            {prediction.type === 'forecast' && prediction.forecastText && (
              <Alert className="mt-4 border-blue-300 bg-blue-50">
                <AlertDescription className="text-sm">
                  <strong>Prévisions Détaillées :</strong>
                  <div className="mt-2 whitespace-pre-wrap">{prediction.forecastText}</div>
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Control Panel Component
const ControlPanel = ({ 
  location, 
  onLocationChange, 
  selectedDate, 
  onDateChange, 
  onSubmit, 
  isLoading 
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sélection de Localisation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Lieu sélectionné</Label>
          <div className="p-3 bg-gray-50 rounded-md text-sm border">
            {location || 'Aucun lieu sélectionné'}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location-select">Ou choisir dans la liste</Label>
          <Select value={location} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un lieu" />
            </SelectTrigger>
            <SelectContent>
              {senegalLocations.map((loc) => (
                <SelectItem key={loc.name} value={loc.name}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={today}
          />
          <p className="text-xs text-gray-500">
            Aujourd'hui pour le temps actuel, futur pour les prévisions
          </p>
        </div>

        <Button 
          onClick={onSubmit}
          disabled={!location || !selectedDate || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Chargement...
            </>
          ) : (
            'Obtenir la Météo'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const WeatherDashboard = () => {
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [advice, setAdvice] = useState('');
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatDateToYYYYMMDD = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchRealTimeWeather = async (locName) => {
    setIsLoadingPrediction(true);
    setErrorMessage('');
    
    const locationData = senegalLocations.find(l => l.name === locName);
    const avgHotSeasonTemp = locationData ? locationData.avgHotSeasonTemp : 35;
    const forecastVariance = locationData ? locationData.forecastVariance : 4;

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const currentMonth = new Date().getMonth();
      let baseTemperature;
      
      if (currentMonth >= 3 && currentMonth <= 10) {
        baseTemperature = avgHotSeasonTemp + Math.floor(Math.random() * (forecastVariance / 2)) - Math.floor(Math.random() * (forecastVariance / 2));
        baseTemperature = Math.max(baseTemperature, 28);
      } else {
        baseTemperature = Math.floor(Math.random() * (28 - 20 + 1)) + 20;
      }

      const lowerBound = Math.max(baseTemperature - 2, 18);
      const upperBound = Math.min(baseTemperature + 2, 45);
      const displayTemperature = `${lowerBound}°C - ${upperBound}°C`;

      const avgTemperature = (lowerBound + upperBound) / 2;
      const isHot = avgTemperature >= 35;

      return { status: isHot ? 'hot' : 'normal', displayTemperature, type: 'current' };
    } catch (error) {
      console.error("Error fetching current weather data:", error);
      setErrorMessage("Échec de la récupération des données météorologiques actuelles.");
      return { status: 'error', displayTemperature: 'N/A', type: 'current' };
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  const fetchForecastWithAI = async (locName, date) => {
    setIsLoadingPrediction(true);
    setErrorMessage('');
    
    const locationData = senegalLocations.find(l => l.name === locName);
    const avgHotSeasonTemp = locationData ? locationData.avgHotSeasonTemp : 35;
    const forecastVariance = locationData ? locationData.forecastVariance : 5;

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const d = new Date(date);
      const month = d.getMonth();
      let baseTemperature;

      if (month >= 3 && month <= 10) {
        baseTemperature = avgHotSeasonTemp + Math.floor(Math.random() * forecastVariance) - Math.floor(Math.random() * (forecastVariance / 2));
        baseTemperature = Math.max(baseTemperature, 30);
      } else {
        baseTemperature = Math.floor(Math.random() * (30 - 22 + 1)) + 22;
      }

      const lowerBound = baseTemperature;
      const upperBound = baseTemperature + Math.floor(Math.random() * (forecastVariance / 2));
      const displayTemperature = `${lowerBound}°C - ${upperBound}°C`;

      const avgTemperature = (lowerBound + upperBound) / 2;
      const isHot = avgTemperature >= 35;

      // Simulate AI forecast text
      const forecastText = `Prévisions pour ${locName} le ${date}: Les conditions météorologiques seront ${isHot ? 'chaudes avec des températures élevées' : 'modérées'}. ${isHot ? 'Il est recommandé de rester hydraté et d\'éviter les activités extérieures pendant les heures les plus chaudes.' : 'Conditions favorables pour les activités extérieures.'}`;

      return { 
        status: isHot ? 'hot' : 'normal', 
        displayTemperature, 
        type: 'forecast', 
        forecastText 
      };
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setErrorMessage("Échec de la génération des prévisions.");
      return { status: 'error', displayTemperature: 'N/A', type: 'forecast', forecastText: "Prévision non disponible." };
    } finally {
      setIsLoadingPrediction(false);
    }
  };

  const fetchAdvice = async (weatherStatus) => {
    if (weatherStatus !== 'hot') {
      setAdvice('');
      return;
    }

    setIsLoadingAdvice(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAdvice = `• Buvez beaucoup d'eau régulièrement
• Évitez les activités extérieures entre 10h et 16h
• Portez des vêtements légers et de couleur claire
• Surveillez les personnes âgées et les enfants
• Restez dans des endroits climatisés si possible`;

      setAdvice(mockAdvice);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setErrorMessage("Échec de la récupération des conseils.");
      setAdvice('');
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  const handleSubmit = async () => {
    if (!location || !selectedDate) {
      setErrorMessage('Veuillez sélectionner un lieu et une date.');
      return;
    }

    setPrediction(null);
    setAdvice('');
    setErrorMessage('');

    const today = formatDateToYYYYMMDD(new Date());
    let weatherResult;

    if (selectedDate === today) {
      weatherResult = await fetchRealTimeWeather(location);
    } else {
      weatherResult = await fetchForecastWithAI(location, selectedDate);
    }
    
    setPrediction(weatherResult);

    if (weatherResult.status === 'hot' && weatherResult.type === 'current') {
      await fetchAdvice(weatherResult.status);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-blue-600">GeoAI</span> Prévisions Météo
          </h1>
          <p className="text-gray-600 mt-2">
            Prévisions météorologiques intelligentes pour le Sénégal
          </p>
        </header>

        {errorMessage && (
          <Alert className="mb-4 border-red-300 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Map Section - 3/4 of the page */}
          <div className="col-span-3">
            <WeatherMap 
              onLocationSelect={setLocation} 
              selectedLocation={location}
            />
          </div>

          {/* Control Panel - 1/4 of the page */}
          <div className="col-span-1 space-y-4">
            <ControlPanel
              location={location}
              onLocationChange={setLocation}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onSubmit={handleSubmit}
              isLoading={isLoadingPrediction || isLoadingAdvice}
            />

            <WeatherPrediction
              prediction={prediction}
              advice={advice}
              isLoading={isLoadingPrediction || isLoadingAdvice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;