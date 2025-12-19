'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fakeClientData } from '@/lib/fake-data';
import { Search, MapPin, Star, Calendar, Video, Building } from 'lucide-react';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [city, setCity] = useState('all');
  const [consultationType, setConsultationType] = useState('all');

  const filteredResults = fakeClientData.searchResults.filter(practitioner => {
    const matchesSearch = practitioner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         practitioner.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialty === 'all' || practitioner.specialty === specialty;
    const matchesCity = city === 'all' || practitioner.location.includes(city);
    const matchesType = consultationType === 'all' ||
                       practitioner.consultationType.includes(consultationType);

    return matchesSearch && matchesSpecialty && matchesCity && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rechercher un praticien</h1>
        <p className="text-muted-foreground mt-1">Trouvez le professionnel de santé adapté à vos besoins</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres de recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom ou spécialité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Spécialité</label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les spécialités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les spécialités</SelectItem>
                  <SelectItem value="Pédiatrie">Pédiatrie</SelectItem>
                  <SelectItem value="Psychiatrie">Psychiatrie</SelectItem>
                  <SelectItem value="Gynécologie">Gynécologie</SelectItem>
                  <SelectItem value="Rhumatologie">Rhumatologie</SelectItem>
                  <SelectItem value="Endocrinologie">Endocrinologie</SelectItem>
                  <SelectItem value="Urologie">Urologie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Ville</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les villes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  <SelectItem value="Lisboa">Lisboa</SelectItem>
                  <SelectItem value="Porto">Porto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type de consultation</label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Présentiel">Présentiel</SelectItem>
                  <SelectItem value="En ligne">En ligne</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredResults.length} praticien{filteredResults.length > 1 ? 's' : ''} trouvé{filteredResults.length > 1 ? 's' : ''}
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Mieux notés</SelectItem>
              <SelectItem value="availability">Disponibilité</SelectItem>
              <SelectItem value="price">Prix</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredResults.map((practitioner) => (
            <Card key={practitioner.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-20 w-20 border-2 border-slate-100">
                    <AvatarImage src={practitioner.avatar} alt={practitioner.name} />
                    <AvatarFallback>{practitioner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-lg">{practitioner.name}</h3>
                        <p className="text-sm text-muted-foreground">{practitioner.specialty}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        {practitioner.price}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-sm">{practitioner.rating}</span>
                      <span className="text-sm text-muted-foreground">({practitioner.reviews} avis)</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{practitioner.location}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      {practitioner.consultationType.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type === 'En ligne' ? (
                            <Video className="h-3 w-3 mr-1" />
                          ) : (
                            <Building className="h-3 w-3 mr-1" />
                          )}
                          {type}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-muted-foreground">
                          Dispo le <span className="font-medium text-foreground">{practitioner.nextAvailable}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">Réserver</Button>
                      <Button variant="outline">Voir profil</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
