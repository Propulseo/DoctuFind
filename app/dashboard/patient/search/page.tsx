'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fakePatientData } from '@/lib/fake-data';
import {
  Search,
  MapPin,
  Star,
  Calendar,
  Video,
  Building,
  SlidersHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const specialties = [
  'Toutes',
  'Cardiologie',
  'Dentiste',
  'Dermatologie',
  'Gynécologie',
  'Médecin généraliste',
  'Neurologie',
  'Ophtalmologie',
  'Orthopédie',
  'Psychiatrie',
  'Urologie'
];

const cities = ['Toutes', 'Lisbonne', 'Porto', 'Braga', 'Coimbra', 'Faro'];

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Toutes');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [consultationType, setConsultationType] = useState('all');

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rechercher un praticien</h1>
        <p className="text-gray-600 mt-1">Trouvez le professionnel de santé qu'il vous faut</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Nom, spécialité..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </Button>
              <Button>Rechercher</Button>
            </div>

            {showFilters && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label>Spécialité</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Type de consultation</Label>
                  <Select value={consultationType} onValueChange={setConsultationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="presential">Présentiel</SelectItem>
                      <SelectItem value="online">En ligne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date souhaitée</Label>
                  <Input type="date" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {fakePatientData.searchResults.length} praticiens trouvés
        </p>
        <Select defaultValue="rating">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Mieux notés</SelectItem>
            <SelectItem value="availability">Disponibilité</SelectItem>
            <SelectItem value="price">Prix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {fakePatientData.searchResults.map((practitioner) => (
          <Card key={practitioner.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar className="h-20 w-20 border-2 border-gray-100">
                  <AvatarImage src={practitioner.photo} />
                  <AvatarFallback>{practitioner.name.split(' ')[1][0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">
                        {practitioner.name}
                      </h3>
                      <p className="text-sm text-gray-600">{practitioner.specialty}</p>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {practitioner.price}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{practitioner.rating}</span>
                    <span className="text-sm text-gray-500">
                      ({practitioner.reviews} avis)
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{practitioner.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>
                        Dispo: {format(new Date(practitioner.nextAvailable), "d MMMM", { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {practitioner.consultationType.includes('Présentiel') && (
                        <Badge variant="outline" className="text-xs">
                          <Building className="h-3 w-3 mr-1" />
                          Présentiel
                        </Badge>
                      )}
                      {practitioner.consultationType.includes('En ligne') && (
                        <Badge variant="outline" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          En ligne
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button className="flex-1">Réserver</Button>
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
