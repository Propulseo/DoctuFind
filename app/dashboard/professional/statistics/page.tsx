'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fakeProfessionalData } from '@/lib/fake-data';
import { Download, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#00A67E', '#10b981', '#34d399', '#6ee7b7'];

export default function StatisticsPage() {
  const [period, setPeriod] = useState('30');
  const { statistics, appointmentsEvolution } = fakeProfessionalData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <p className="text-muted-foreground">Analyses et performances de votre activité</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <Button
              variant={period === '7' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('7')}
            >
              7j
            </Button>
            <Button
              variant={period === '30' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('30')}
            >
              30j
            </Button>
            <Button
              variant={period === '90' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('90')}
            >
              3 mois
            </Button>
            <Button
              variant={period === '365' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod('365')}
            >
              Année
            </Button>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Rendez-vous</CardTitle>
              <CardDescription>Nombre de consultations sur la période sélectionnée</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={appointmentsEvolution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="appointments"
                      stroke="#00A67E"
                      strokeWidth={2}
                      name="Rendez-vous"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Type</CardTitle>
                <CardDescription>Distribution des types de consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statistics.appointmentsByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statistics.appointmentsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taux de Présence</CardTitle>
                <CardDescription>Patients présents vs absents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statistics.attendanceRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="status" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#00A67E" name="Pourcentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#00A67E]">92%</p>
                    <p className="text-sm text-muted-foreground">Taux de présence</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-muted-foreground">8%</p>
                    <p className="text-sm text-muted-foreground">Taux d'absence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Revenus</CardTitle>
              <CardDescription>Revenus mensuels sur les derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statistics.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#00A67E" name="Revenus (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Revenu Moyen Mensuel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(
                    statistics.monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0) /
                      statistics.monthlyRevenue.length
                  )}
                  €
                </div>
                <p className="text-xs text-muted-foreground mt-1">Sur 7 mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Meilleur Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5500€</div>
                <p className="text-xs text-muted-foreground mt-1">Septembre 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {statistics.monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0)}€
                </div>
                <p className="text-xs text-muted-foreground mt-1">Sur 7 mois</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">RDV par Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.2</div>
                <p className="text-xs text-muted-foreground mt-1">Moyenne journalière</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Durée Moyenne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32 min</div>
                <p className="text-xs text-muted-foreground mt-1">Par consultation</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Taux d'Annulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5%</div>
                <p className="text-xs text-muted-foreground mt-1">En baisse</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Patients Fidèles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground mt-1">Reviennent régulièrement</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Indicateurs Clés de Performance</CardTitle>
              <CardDescription>Vue d'ensemble de vos performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Taux d'occupation</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[#00A67E] h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Satisfaction patients</span>
                    <span className="text-sm text-muted-foreground">4.8/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[#00A67E] h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Nouveaux patients</span>
                    <span className="text-sm text-muted-foreground">12 ce mois</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-[#00A67E] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
