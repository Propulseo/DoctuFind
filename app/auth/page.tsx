'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Stethoscope, Shield } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();

  const handleLogin = (userType: 'patient' | 'professional' | 'admin') => {
    localStorage.setItem('userType', userType);

    if (userType === 'patient') {
      router.push('/dashboard/patient');
    } else if (userType === 'professional') {
      router.push('/dashboard/professional');
    } else {
      router.push('/dashboard/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choisir un profil de test</h1>
          <p className="text-gray-600">Sélectionnez le type de compte pour accéder au dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500" onClick={() => handleLogin('patient')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Patient</CardTitle>
              <CardDescription>João Silva</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>35 ans, Lisbonne</p>
                <p>3 RDV à venir</p>
                <p>5 RDV passés</p>
                <p>4 documents</p>
              </div>
              <Button className="w-full" onClick={() => handleLogin('patient')}>
                Se connecter en tant que Patient
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-500" onClick={() => handleLogin('professional')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Professionnel</CardTitle>
              <CardDescription>Dr. Maria Santos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Cardiologue</p>
                <p>15 ans d'expérience</p>
                <p>12 RDV aujourd'hui</p>
                <p>250+ patients</p>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleLogin('professional')}>
                Se connecter en tant que Pro
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500" onClick={() => handleLogin('admin')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Administrateur</CardTitle>
              <CardDescription>Admin System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Accès total</p>
                <p>Gestion plateforme</p>
                <p>Statistiques globales</p>
                <p>Utilisateurs et contenus</p>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => handleLogin('admin')}>
                Se connecter en tant qu'Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
