'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { fakePatientData } from '@/lib/fake-data';
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  Star,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function PatientDashboard() {
  const nextAppointment = fakePatientData.upcomingAppointments[0];

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Bienvenue, {fakePatientData.profile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-600">Gérez vos rendez-vous et votre santé en toute simplicité</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-2 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover-lift transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Prochain rendez-vous
                </CardTitle>
                <CardDescription className="mt-1">Dans {Math.ceil((new Date(nextAppointment.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1 shadow-sm">
                ✓ Confirmé
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md ring-2 ring-blue-100">
                <AvatarImage src={nextAppointment.practitioner.photo} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-semibold">
                  {nextAppointment.practitioner.name.split(' ')[1][0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{nextAppointment.practitioner.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{nextAppointment.practitioner.specialty}</p>
                <div className="flex items-center mt-1 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {format(new Date(nextAppointment.date), "EEEE d MMMM yyyy", { locale: fr })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{nextAppointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{nextAppointment.location}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button className="flex-1 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md">
                Voir les détails
              </Button>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-all">
                Modifier
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-200 transition-all hover-lift">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              Recherche rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">Trouvez un praticien près de chez vous</p>
            <Link href="/dashboard/patient/search">
              <Button className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm hover:shadow-md" variant="outline">
                Rechercher un praticien
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <div className="pt-2 space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recherches populaires:</p>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary" className="text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                  Dentiste
                </Badge>
                <Badge variant="secondary" className="text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                  Cardiologue
                </Badge>
                <Badge variant="secondary" className="text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer">
                  Dermatologue
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Mes praticiens favoris
          </h2>
          <Link href="/dashboard/patient/search">
            <Button variant="ghost" size="sm">
              Voir tous
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fakePatientData.favoritePractitioners.map((practitioner, index) => (
            <Card
              key={practitioner.id}
              className="hover:shadow-lg transition-all hover-lift border-2 hover:border-blue-200 animate-scale-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-gray-100 ring-2 ring-gray-50">
                    <AvatarImage src={practitioner.photo} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-semibold">
                      {practitioner.name.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{practitioner.name}</h3>
                    <p className="text-sm text-gray-600">{practitioner.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{practitioner.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="truncate">{practitioner.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span>Dispo: {format(new Date(practitioner.nextAvailable), "d MMM", { locale: fr })}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-sm hover:shadow-md" size="sm">
                  Prendre rendez-vous
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Recommandations IA
          </CardTitle>
          <CardDescription>Suggestions personnalisées basées sur votre historique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Bilan de santé annuel</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Il est temps de programmer votre bilan de santé annuel avec votre médecin généraliste
                </p>
                <Button variant="link" className="h-auto p-0 mt-2 text-purple-600">
                  Prendre rendez-vous
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Suivi cardiologique</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Basé sur votre dernière consultation, un suivi dans 3 mois est recommandé
                </p>
                <Button variant="link" className="h-auto p-0 mt-2 text-purple-600">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
