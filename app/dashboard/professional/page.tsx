'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { fakeProfessionalData } from '@/lib/fake-data';
import { Calendar, Users, TrendingUp, Euro, Clock, Video, MapPin, Bell, Lightbulb, CircleCheck as CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProfessionalDashboard() {
  const { kpis, todayAppointments, appointmentsEvolution, notifications, aiSuggestions } = fakeProfessionalData;

  return (
    <div className="space-y-6 p-4 lg:p-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
          Tableau de bord 👨‍⚕️
        </h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité professionnelle</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift transition-all border-2 hover:border-green-200 animate-scale-in" style={{animationDelay: '0s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RDV Aujourd'hui</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{kpis.appointmentsToday}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Consultations prévues</p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-blue-200 animate-scale-in" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette Semaine</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{kpis.appointmentsThisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">RDV programmés</p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-purple-200 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Présence</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{kpis.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Patients présents</p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-amber-200 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du Mois</CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Euro className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{kpis.monthlyRevenue}€</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">{kpis.totalAppointmentsThisMonth} consultations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 hover-lift transition-all border-2 hover:border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Agenda du Jour
            </CardTitle>
            <CardDescription>Vos rendez-vous d'aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayAppointments.map((appointment, index) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 rounded-lg border-2 bg-card hover:shadow-lg transition-all hover:border-green-200 group animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-3 min-w-[70px] border-2 border-green-200 group-hover:scale-110 transition-transform">
                    <Clock className="h-5 w-5 text-green-600 mb-1" />
                    <span className="text-sm font-bold text-green-700">{appointment.time}</span>
                  </div>
                  <Avatar className="h-12 w-12 border-2 border-gray-100 ring-2 ring-gray-50">
                    <AvatarImage src={appointment.patient.photo} />
                    <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-200 text-green-700 font-semibold">
                      {appointment.patient.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{appointment.patient.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {appointment.type === 'Téléconsultation' ? (
                        <Video className="h-4 w-4 text-blue-600" />
                      ) : (
                        <MapPin className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-medium">{appointment.type}</span>
                      <span>•</span>
                      <span>{appointment.duration} min</span>
                    </div>
                  </div>
                  <Badge
                    variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                    className={appointment.status === 'confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100 shadow-sm' : ''}
                  >
                    {appointment.status === 'confirmed' ? '✓ Confirmé' : 'En attente'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="hover-lift transition-all border-2 hover:border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.map((notif, index) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border-2 transition-all hover:shadow-md animate-fade-in ${
                      notif.read ? 'bg-muted/50 border-gray-200' : 'bg-green-50/50 border-green-200'
                    }`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <p className="text-sm font-medium">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      {new Date(notif.time).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-all border-2 hover:border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-purple-600" />
                </div>
                Assistant IA
              </CardTitle>
              <CardDescription>Suggestions d'optimisation personnalisées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiSuggestions.map((suggestion, index) => (
                  <Alert
                    key={suggestion.id}
                    className="border-2 border-purple-200 bg-white hover:shadow-md transition-all animate-scale-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <AlertDescription className="text-sm font-medium">
                      💡 {suggestion.message}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="hover-lift transition-all border-2 hover:border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Évolution des Rendez-vous
          </CardTitle>
          <CardDescription>Nombre de consultations sur les 30 derniers jours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentsEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
