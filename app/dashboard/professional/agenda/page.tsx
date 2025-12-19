'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fakeProfessionalData } from '@/lib/fake-data';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function AgendaPage() {
  const { calendarEvents, todayAppointments } = fakeProfessionalData;
  const [currentDate] = useState(new Date());

  const getEventsByType = (type: string) => {
    return calendarEvents.filter((event) => event.type === type);
  };

  const appointments = getEventsByType('appointment');
  const availableSlots = getEventsByType('available');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mon Agenda</h1>
          <p className="text-muted-foreground">Gérez vos rendez-vous et disponibilités</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          <Button className="bg-[#00A67E] hover:bg-[#00A67E]/90">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau créneau
          </Button>
        </div>
      </div>

      <Tabs defaultValue="day" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day">Jour</TabsTrigger>
          <TabsTrigger value="week">Semaine</TabsTrigger>
          <TabsTrigger value="month">Mois</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div>
                    <CardTitle>
                      {currentDate.toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {appointments.length} rendez-vous • {availableSlots.length} créneaux disponibles
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Aujourd'hui
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {calendarEvents.map((event) => {
                  const startTime = new Date(event.start).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });
                  const endTime = new Date(event.end).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  if (event.type === 'available') {
                    return (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-[#00A67E]/30 bg-[#00A67E]/5"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
                          <Clock className="h-4 w-4" />
                          <span>
                            {startTime} - {endTime}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#00A67E]">{event.title}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Réserver
                        </Button>
                      </div>
                    );
                  }

                  if (event.type === 'break') {
                    return (
                      <div
                        key={event.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted"
                      >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
                          <Clock className="h-4 w-4" />
                          <span>
                            {startTime} - {endTime}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.title}</p>
                        </div>
                      </div>
                    );
                  }

                  const appointment = todayAppointments.find(
                    (apt) => apt.time === startTime.replace(':', 'h')
                  );

                  return (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[100px]">
                        <Clock className="h-4 w-4" />
                        <span>
                          {startTime} - {endTime}
                        </span>
                      </div>
                      {appointment && (
                        <>
                          <Avatar>
                            <AvatarImage src={appointment.patient.photo} />
                            <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{appointment.patient.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {appointment.type.includes('Télé') ? (
                                <Video className="h-3 w-3" />
                              ) : (
                                <MapPin className="h-3 w-3" />
                              )}
                              <span>{appointment.type}</span>
                            </div>
                          </div>
                          <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                            {event.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Détails
                          </Button>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardHeader>
              <CardTitle>Vue Semaine</CardTitle>
              <CardDescription>Calendrier hebdomadaire avec créneaux disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                <div className="text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Vue semaine disponible prochainement</p>
                  <p className="text-sm mt-2">
                    Utilisez la vue jour pour gérer vos rendez-vous d'aujourd'hui
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardHeader>
              <CardTitle>Vue Mois</CardTitle>
              <CardDescription>Calendrier mensuel avec aperçu des disponibilités</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                <div className="text-center">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Vue mois disponible prochainement</p>
                  <p className="text-sm mt-2">Intégration Google Calendar / Outlook à venir</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Créer un Créneau Récurrent</CardTitle>
            <CardDescription>Définissez des disponibilités qui se répètent</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Nouveau créneau récurrent
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bloquer une Période</CardTitle>
            <CardDescription>Vacances, formations ou absences</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Bloquer des dates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
