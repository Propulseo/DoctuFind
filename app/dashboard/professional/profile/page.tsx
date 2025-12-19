'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fakeProfessionalData } from '@/lib/fake-data';
import { Mail, Phone, MapPin, FileText, Languages, Clock, CreditCard as Edit, Briefcase } from 'lucide-react';

export default function ProfilePage() {
  const { profile } = fakeProfessionalData;

  const weekDays = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mon Profil Professionnel</h1>
          <p className="text-muted-foreground">Informations visibles par vos patients</p>
        </div>
        <Button className="bg-[#00A67E] hover:bg-[#00A67E]/90">
          <Edit className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                Changer la photo
              </Button>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-lg text-muted-foreground mt-1">{profile.specialty}</p>
                <Badge className="mt-2" variant="secondary">
                  N° {profile.registrationNumber}
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:col-span-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse du cabinet</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Bio Professionnelle
            </CardTitle>
            <CardDescription>Présentez votre expertise aux patients</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{profile.bio}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Langues Parlées
            </CardTitle>
            <CardDescription>Communiquez avec vos patients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language) => (
                <Badge key={language} variant="secondary">
                  {language}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horaires d'Ouverture
          </CardTitle>
          <CardDescription>Planning de disponibilité du cabinet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weekDays.map((day) => {
              const hours = profile.officeHours[day.key as keyof typeof profile.officeHours];
              return (
                <div key={day.key} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="font-medium">{day.label}</span>
                  <span className={hours === 'Fermé' ? 'text-muted-foreground' : 'text-[#00A67E] font-medium'}>
                    {hours}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Informations Complémentaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Diplômes</p>
              <p className="text-sm">Université de Porto - 2008</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Années d'expérience</p>
              <p className="text-sm">15 ans</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Spécialisations</p>
              <p className="text-sm">Médecine préventive, Maladies chroniques</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Associations</p>
              <p className="text-sm">Ordre des Médecins du Portugal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
