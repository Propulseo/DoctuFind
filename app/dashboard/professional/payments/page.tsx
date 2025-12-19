'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fakeProfessionalData } from '@/lib/fake-data';
import { Euro, TrendingUp, CreditCard, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PaymentsPage() {
  const { payments, statistics } = fakeProfessionalData;

  const currentMonthRevenue = payments
    .filter((p) => p.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const paidCount = payments.filter((p) => p.status === 'paid').length;
  const pendingCount = payments.filter((p) => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paiements</h1>
        <p className="text-muted-foreground">Suivi de vos transactions et revenus</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus du Mois</CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthRevenue}€</div>
            <p className="text-xs text-muted-foreground mt-1">{paidCount} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAmount}€</div>
            <p className="text-xs text-muted-foreground mt-1">{pendingCount} paiement(s)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(currentMonthRevenue / paidCount)}€
            </div>
            <p className="text-xs text-muted-foreground mt-1">Par consultation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mode Préféré</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Carte</div>
            <p className="text-xs text-muted-foreground mt-1">45% des paiements</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenus Mensuels</CardTitle>
          <CardDescription>Évolution de vos revenus sur les derniers mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#00A67E" name="Revenus (€)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
          <CardDescription>Historique des paiements reçus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{payment.patient}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{payment.amount}€</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {payment.method === 'Carte bancaire' && <CreditCard className="h-3 w-3" />}
                        <span>{payment.method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                        {payment.status === 'paid' ? 'Payé' : 'En attente'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Méthode</CardTitle>
            <CardDescription>Distribution des modes de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { method: 'Carte bancaire', count: 5, percentage: 50 },
                { method: 'MB Way', count: 3, percentage: 30 },
                { method: 'Espèces', count: 2, percentage: 20 },
              ].map((item) => (
                <div key={item.method}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.method}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-[#00A67E] h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectifs du Mois</CardTitle>
            <CardDescription>Progression vers vos objectifs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Objectif revenu</span>
                  <span className="text-sm text-muted-foreground">
                    {currentMonthRevenue}€ / 6000€
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-[#00A67E] h-2 rounded-full"
                    style={{ width: `${(currentMonthRevenue / 6000) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Objectif consultations</span>
                  <span className="text-sm text-muted-foreground">120 / 150</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-[#00A67E] h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
