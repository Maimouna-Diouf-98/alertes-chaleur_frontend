'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cloud, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const senegalRegions = [
  'Dakar', 'Thies', 'Kaolack', 'Ziguinchor', 'Saint-Louis', 
  'Diourbel', 'Tambacounda', 'Kolda', 'Fatick', 'Matam', 
  'Kedougou', 'Louga', 'Sédhiou', 'Kaffrine'
];

const formSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  dateNaissance: z.string().min(1, 'La date de naissance est requise'),
  region: z.string().min(1, 'La région est requise'),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Simuler une inscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now().toString(),
      nom: data.nom,
      prenom: data.prenom,
      dateNaissance: data.dateNaissance,
      region: data.region,
    };
    
    login(userData);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-600">GeoAI</span> Météo
            </h1>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Inscription</CardTitle>
            <CardDescription className="text-center">
              Créez votre compte pour accéder aux prévisions météo intelligentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  placeholder="Entrez votre nom"
                  {...register('nom')}
                  className={errors.nom ? 'border-red-500' : ''}
                />
                {errors.nom && (
                  <p className="text-sm text-red-500">{errors.nom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  placeholder="Entrez votre prénom"
                  {...register('prenom')}
                  className={errors.prenom ? 'border-red-500' : ''}
                />
                {errors.prenom && (
                  <p className="text-sm text-red-500">{errors.prenom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateNaissance">Date de naissance</Label>
                <Input
                  id="dateNaissance"
                  type="date"
                  {...register('dateNaissance')}
                  className={errors.dateNaissance ? 'border-red-500' : ''}
                />
                {errors.dateNaissance && (
                  <p className="text-sm text-red-500">{errors.dateNaissance.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Région</Label>
                <Select onValueChange={(value) => setValue('region', value)}>
                  <SelectTrigger className={errors.region ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Sélectionnez votre région" />
                  </SelectTrigger>
                  <SelectContent>
                    {senegalRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && (
                  <p className="text-sm text-red-500">{errors.region.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Inscription...
                  </>
                ) : (
                  'S\'inscrire'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{' '}
                <Button 
                  variant="link" 
                  onClick={() => router.push('/login')}
                  className="p-0 text-blue-600 hover:text-blue-700"
                >
                  Se connecter
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}