'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Calendar, TrendingUp, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Activity } from 'lucide-react';
import { fakeAdminData } from '@/lib/fake-data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AdminOverviewPage() {
  const { kpis, registrationsByDay, appointmentsBySpecialty, topCities, recentActivity } = fakeAdminData;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'professional_registration':
        return <UserCheck className="h-4 w-4 text-green-600" />;
      case 'appointment':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'report':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6 p-4 lg:p-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent">
          Vue d'ensemble 🎯
        </h1>
        <p className="text-gray-600">Statistiques et activité de la plateforme</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift transition-all border-2 hover:border-blue-200 animate-scale-in" style={{animationDelay: '0s'}}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Utilisateurs</CardTitle>
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{kpis.totalUsers.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1 font-medium">Patients inscrits</p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-green-200 animate-scale-in" style={{animationDelay: '0.1s'}}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Professionnels</CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{kpis.totalProfessionals}</div>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              {kpis.validatedProfessionals} validés • {kpis.pendingProfessionals} en attente
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-purple-200 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">RDV ce mois</CardTitle>
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{kpis.appointmentsThisMonth.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1 font-medium">Rendez-vous programmés</p>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-orange-200 animate-scale-in" style={{animationDelay: '0.3s'}}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Croissance</CardTitle>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">+{kpis.growthRate}%</div>
            <p className="text-sm text-gray-500 mt-1 font-medium">vs mois dernier</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift transition-all border-2 hover:border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Inscriptions (30 derniers jours)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={registrationsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #3B82F6',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="Utilisateurs" dot={{ fill: '#3B82F6', r: 4 }} />
                  <Line type="monotone" dataKey="professionals" stroke="#10B981" strokeWidth={3} name="Professionnels" dot={{ fill: '#10B981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Rendez-vous par spécialité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentsBySpecialty}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="specialty" stroke="#6B7280" fontSize={10} angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #9333EA',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="appointments" fill="#9333EA" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover-lift transition-all border-2 hover:border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Top 5 villes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCities.map((city, index) => (
                <div
                  key={city.city}
                  className="flex items-center justify-between p-3 rounded-lg border-2 hover:shadow-md transition-all hover:border-indigo-200 bg-gradient-to-r from-white to-indigo-50/30 animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{city.city}</div>
                      <div className="text-sm text-gray-600">{city.professionals} professionnels</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-600 text-lg">{city.users}</div>
                    <div className="text-xs text-gray-500 font-medium">utilisateurs</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift transition-all border-2 hover:border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border-2 hover:shadow-md transition-all bg-white animate-fade-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="mt-1 h-8 w-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap font-medium">
                    {formatTime(activity.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
