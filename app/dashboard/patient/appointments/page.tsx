'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { fakePatientData } from '@/lib/fake-data';
import {
  Calendar,
  MapPin,
  Clock,
  Video,
  Building,
  MoreVertical,
  Trash2,
  Edit,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Confirmé
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          En attente
        </Badge>
      );
    case 'completed':
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Terminé
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="h-3 w-3 mr-1" />
          Annulé
        </Badge>
      );
    default:
      return null;
  }
};

export default function AppointmentsPage() {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const handleCancelClick = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = () => {
    setCancelDialogOpen(false);
    setSelectedAppointment(null);
  };

  const AppointmentCard = ({ appointment, showActions = true }: any) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={appointment.practitioner.photo} />
              <AvatarFallback>{appointment.practitioner.name.split(' ')[1][0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {appointment.practitioner.name}
                  </h3>
                  <p className="text-sm text-gray-600">{appointment.practitioner.specialty}</p>
                </div>
                {getStatusBadge(appointment.status)}
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">
                    {format(new Date(appointment.date), "EEEE d MMMM yyyy", { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {appointment.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {appointment.location === 'En ligne' ? (
                    <>
                      <Video className="h-4 w-4" />
                      <span>Téléconsultation</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{appointment.location}</span>
                    </>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {appointment.type}
                </Badge>
              </div>
            </div>
          </div>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Ajouter au calendrier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleCancelClick(appointment.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Annuler
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {showActions && appointment.status === 'confirmed' && appointment.location === 'En ligne' && (
          <Button className="w-full mt-4">
            <Video className="h-4 w-4 mr-2" />
            Rejoindre la consultation
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes rendez-vous</h1>
        <p className="text-gray-600 mt-1">Gérez tous vos rendez-vous médicaux</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="upcoming">
            À venir
            <Badge variant="secondary" className="ml-2">
              {fakePatientData.upcomingAppointments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past">
            Passés
            <Badge variant="secondary" className="ml-2">
              {fakePatientData.pastAppointments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled">Annulés</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {fakePatientData.upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {fakePatientData.pastAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} showActions={false} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-500">
                <XCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Aucun rendez-vous annulé</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler le rendez-vous</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action ne peut pas être annulée.
              Le praticien sera notifié de l'annulation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Non, garder</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Oui, annuler
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
