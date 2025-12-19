'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { fakePatientData } from '@/lib/fake-data';
import { User, Mail, Phone, MapPin, Calendar, Camera, CircleAlert as AlertCircle, Heart, Droplet, CircleUser as UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const profile = fakePatientData.profile;

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mon profil</h1>
        <p className="text-gray-600 mt-1">Gérez vos informations personnelles et médicales</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full h-10 w-10"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-4">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Groupe sanguin</span>
                  <Badge variant="outline" className="font-semibold">
                    {profile.bloodType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Âge</span>
                  <span className="font-semibold">
                    {new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear()} ans
                  </span>
                </div>
              </div>

              <Button className="w-full mt-6">
                <UserCircle className="h-4 w-4 mr-2" />
                Changer la photo
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Vos coordonnées et informations de base</CardDescription>
                </div>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Enregistrer' : 'Modifier'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      defaultValue={profile.name}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={profile.email}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      defaultValue={profile.phone}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date de naissance</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="dob"
                      type="date"
                      defaultValue={profile.dateOfBirth}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="address"
                    defaultValue={profile.address}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Informations médicales
              </CardTitle>
              <CardDescription>Informations importantes pour vos praticiens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Groupe sanguin</Label>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="bloodType"
                      defaultValue={profile.bloodType}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allergies connues</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                    {profile.allergies.map((allergy, index) => (
                      <Badge key={index} variant="secondary">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical-notes">Notes médicales</Label>
                <Textarea
                  id="medical-notes"
                  placeholder="Antécédents médicaux, traitements en cours..."
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Informations confidentielles</h4>
                    <p className="text-sm text-blue-700">
                      Ces informations sont confidentielles et ne seront partagées qu'avec les praticiens
                      que vous consultez.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact d'urgence</CardTitle>
              <CardDescription>Personne à contacter en cas d'urgence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Nom du contact</Label>
                  <Input
                    id="emergency-name"
                    defaultValue={profile.emergencyContact.name}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Téléphone</Label>
                  <Input
                    id="emergency-phone"
                    defaultValue={profile.emergencyContact.phone}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-relation">Relation</Label>
                  <Input
                    id="emergency-relation"
                    defaultValue={profile.emergencyContact.relationship}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
