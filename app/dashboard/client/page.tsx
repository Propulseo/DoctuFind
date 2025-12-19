'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { fakeClientData } from '@/lib/fake-data';
import { Calendar, Clock, MapPin, Video, Search, Star, TrendingUp, CircleAlert as AlertCircle, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ClientDashboardPage() {
  const nextAppointment = fakeClientData.upcomingAppointments[0];

  return (
    <div className="space-y-6 p-4 lg:p-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Bonjour, {fakeClientData.profile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-600">Voici un aperçu de votre suivi médical</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-2 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white hover-lift transition-all">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">Prochain rendez-vous</CardTitle>
                <CardDescription>Ne manquez pas votre consultation</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Confirmé
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow">
                  <AvatarImage src={nextAppointment.avatar} alt={nextAppointment.practitioner} />
                  <AvatarFallback>{nextAppointment.practitioner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{nextAppointment.practitioner}</p>
                  <p className="text-sm text-muted-foreground">{nextAppointment.specialty}</p>
                </div>
              </div>

              <div className="grid gap-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    {format(new Date(nextAppointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>{nextAppointment.time}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  {nextAppointment.type === 'En ligne' ? (
                    <Video className="h-4 w-4 text-blue-600" />
                  ) : (
                    <MapPin className="h-4 w-4 text-blue-600" />
                  )}
                  <span>{nextAppointment.location}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1">Rejoindre la consultation</Button>
                <Button size="sm" variant="outline">Modifier</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recherche rapide</CardTitle>
            <CardDescription>Trouvez un praticien</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/client/search">
              <Button className="w-full gap-2" size="lg">
                <Search className="h-5 w-5" />
                Rechercher un praticien
              </Button>
            </Link>
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Recherches fréquentes :</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Dentiste</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Généraliste</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">Kiné</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Praticiens favoris</CardTitle>
              <Link href="/dashboard/client/search">
                <Button variant="ghost" size="sm">Voir tout</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fakeClientData.favoritePractitioners.map((practitioner) => (
                <div key={practitioner.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <Avatar>
                    <AvatarImage src={practitioner.avatar} alt={practitioner.name} />
                    <AvatarFallback>{practitioner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{practitioner.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{practitioner.specialty}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {practitioner.rating}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Réserver</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recommandations IA
            </CardTitle>
            <CardDescription>Suggestions personnalisées pour votre santé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fakeClientData.aiRecommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    recommendation.priority === 'high'
                      ? 'bg-red-50 border-red-500'
                      : recommendation.priority === 'medium'
                      ? 'bg-orange-50 border-orange-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      className={`h-5 w-5 mt-0.5 ${
                        recommendation.priority === 'high'
                          ? 'text-red-600'
                          : recommendation.priority === 'medium'
                          ? 'text-orange-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{recommendation.specialty}</p>
                      <p className="text-sm text-muted-foreground mt-1">{recommendation.reason}</p>
                      <Button size="sm" variant="link" className="px-0 mt-2">
                        Trouver un spécialiste
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Cardiologie à jour</p>
                    <p className="text-sm text-green-700 mt-1">Dernier contrôle il y a 2 mois</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/client/appointments">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Rendez-vous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">À venir</span>
                  <span className="text-2xl font-bold text-blue-600">{fakeClientData.upcomingAppointments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Passés</span>
                  <span className="text-sm font-medium">{fakeClientData.pastAppointments.length}</span>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/client/documents">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-2xl font-bold text-green-600">{fakeClientData.documents.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Nouveau</span>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/client/messages">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Non lus</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {fakeClientData.messages.reduce((acc, msg) => acc + msg.unread, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversations</span>
                  <span className="text-sm font-medium">{fakeClientData.messages.length}</span>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
