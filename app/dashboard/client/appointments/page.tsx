'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fakeClientData } from '@/lib/fake-data';
import { Calendar, Clock, MapPin, Video, MoveVertical as MoreVertical, Download, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">En attente</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Passé</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Annulé</Badge>;
      default:
        return null;
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 border-2 border-slate-100">
            <AvatarImage src={appointment.avatar} alt={appointment.practitioner} />
            <AvatarFallback>{appointment.practitioner.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg">{appointment.practitioner}</h3>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(appointment.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                      <>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Annuler</DropdownMenuItem>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <DropdownMenuItem>Reprendre RDV</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Voir détails</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid gap-2 mt-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium">
                  {format(new Date(appointment.date), 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {appointment.type === 'En ligne' ? (
                  <>
                    <Video className="h-4 w-4 text-blue-600" />
                    <span>{appointment.location}</span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{appointment.location}</span>
                  </>
                )}
              </div>
            </div>

            {appointment.status === 'confirmed' && (
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="gap-2">
                  {appointment.type === 'En ligne' ? (
                    <>
                      <Video className="h-4 w-4" />
                      Rejoindre
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4" />
                      Itinéraire
                    </>
                  )}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Calendrier
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mes rendez-vous</h1>
        <p className="text-muted-foreground mt-1">Gérez tous vos rendez-vous médicaux</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">
            À venir
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
              {fakeClientData.upcomingAppointments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés
            <Badge variant="secondary" className="ml-2">
              {fakeClientData.pastAppointments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Annulés
            <Badge variant="secondary" className="ml-2">
              {fakeClientData.cancelledAppointments.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {fakeClientData.upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {fakeClientData.pastAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {fakeClientData.cancelledAppointments.length > 0 ? (
            fakeClientData.cancelledAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <X className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun rendez-vous annulé</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
