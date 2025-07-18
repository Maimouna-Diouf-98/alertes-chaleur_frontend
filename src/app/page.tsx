'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, MapPin, Thermometer, AlertTriangle, Loader2 } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Cloud className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">GeoAI</span> Météo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/login')}
              >
                Connexion
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Prévisions Météo Intelligentes pour le Sénégal
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez les conditions météorologiques actuelles et les prévisions 
            personnalisées pour toutes les régions du Sénégal grâce à notre 
            intelligence artificielle avancée.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button 
              size="lg" 
              onClick={() => router.push('/register')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Commencer gratuitement
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => router.push('/login')}
            >
              Se connecter
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Localisation Précise</CardTitle>
              <CardDescription>
                Prévisions détaillées pour toutes les villes et régions du Sénégal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                De Dakar à Tambacounda, obtenez des prévisions météo précises 
                pour votre localisation exacte.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Thermometer className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Prédictions Avancées</CardTitle>
              <CardDescription>
                Intelligence artificielle pour des prévisions plus précises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Notre IA analyse les données climatiques locales pour vous offrir 
                des prévisions adaptées au climat sénégalais.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Alertes Personnalisées</CardTitle>
              <CardDescription>
                Conseils adaptés aux conditions météo extrêmes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Recevez des conseils personnalisés pour vous protéger de la 
                chaleur excessive et des conditions climatiques difficiles.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Prêt à découvrir la météo du Sénégal ?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Inscrivez-vous maintenant et accédez à des prévisions météo personnalisées
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => router.push('/register')}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            S'inscrire gratuitement
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="w-6 h-6" />
            <span className="text-lg font-semibold">GeoAI Météo</span>
          </div>
          <p className="text-gray-400">
            © 2024 GeoAI Météo. Prévisions météo intelligentes pour le Sénégal.
          </p>
        </div>
      </div>
    </div>
  );
}