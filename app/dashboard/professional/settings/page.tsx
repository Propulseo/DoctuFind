'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bell,
  Lock,
  Calendar,
  CreditCard,
  Globe,
  Shield,
  Mail,
  Smartphone,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez vos préférences et configurations</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="calendar">Agenda</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Nouveaux rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevez une notification pour chaque nouvelle demande
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Annulations</Label>
                    <p className="text-sm text-muted-foreground">
                      Soyez alerté quand un patient annule
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Rappels de rendez-vous</Label>
                    <p className="text-sm text-muted-foreground">
                      Rappel 1h avant chaque consultation
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Messages patients</Label>
                    <p className="text-sm text-muted-foreground">
                      Notification pour les nouveaux messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Paiements reçus</Label>
                    <p className="text-sm text-muted-foreground">
                      Confirmation de réception des paiements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canaux de Notification</CardTitle>
              <CardDescription>Choisissez comment recevoir vos notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm text-muted-foreground">
                      maria.santos@cabinet.pt
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label>SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      +351 223 456 789
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Mot de Passe
              </CardTitle>
              <CardDescription>Modifiez votre mot de passe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Mot de passe actuel</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">Nouveau mot de passe</Label>
                  <Input id="new" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                  <Input id="confirm" type="password" />
                </div>
                <Button className="bg-[#00A67E] hover:bg-[#00A67E]/90">
                  Mettre à jour
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Authentification à Deux Facteurs
              </CardTitle>
              <CardDescription>
                Ajoutez une couche de sécurité supplémentaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Activer 2FA</p>
                  <p className="text-sm text-muted-foreground">
                    Protection renforcée de votre compte
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Préférences d'Agenda
              </CardTitle>
              <CardDescription>Personnalisez votre gestion des rendez-vous</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Confirmation automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Confirmer automatiquement les nouveaux RDV
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rappels patients</Label>
                  <p className="text-sm text-muted-foreground">
                    Envoyer un rappel 24h avant le RDV
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Délai minimum de réservation</Label>
                  <p className="text-sm text-muted-foreground">
                    Temps minimum avant un rendez-vous
                  </p>
                </div>
                <Input type="number" defaultValue="2" className="w-24" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Durée par défaut</Label>
                  <p className="text-sm text-muted-foreground">
                    Durée standard d'une consultation
                  </p>
                </div>
                <Input type="number" defaultValue="30" className="w-24" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Intégrations Calendrier
              </CardTitle>
              <CardDescription>
                Synchronisez avec vos calendriers externes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-muted-foreground">Non connecté</p>
                </div>
                <Button variant="outline">Connecter</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Outlook</p>
                  <p className="text-sm text-muted-foreground">Non connecté</p>
                </div>
                <Button variant="outline">Connecter</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Méthodes de Paiement
              </CardTitle>
              <CardDescription>
                Gérez les modes de paiement acceptés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Carte Bancaire</Label>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>MB Way</Label>
                  <p className="text-sm text-muted-foreground">Paiement mobile</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Espèces</Label>
                  <p className="text-sm text-muted-foreground">Paiement en cabinet</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Virement</Label>
                  <p className="text-sm text-muted-foreground">Virement bancaire</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>Paramètres de facturation automatique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Génération automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Créer une facture après chaque consultation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Numéro TVA</Label>
                <Input defaultValue="PT123456789" />
              </div>

              <div className="space-y-2">
                <Label>Logo de facturation</Label>
                <div className="flex gap-2">
                  <Input type="file" className="flex-1" />
                  <Button variant="outline">Upload</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
