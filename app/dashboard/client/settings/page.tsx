'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Lock, Globe, Mail, Smartphone, Moon, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    appointments: true,
    messages: true,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gérez vos préférences et paramètres de compte</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choisissez comment vous souhaitez être notifié</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Notifications par email
                </Label>
                <p className="text-sm text-muted-foreground">Recevez des emails pour les mises à jour importantes</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Notifications SMS
                </Label>
                <p className="text-sm text-muted-foreground">Recevez des SMS pour les rappels de rendez-vous</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifications push</Label>
                <p className="text-sm text-muted-foreground">Recevez des notifications sur votre appareil</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>

            <div className="border-t pt-4 space-y-4">
              <h4 className="font-medium">Types de notifications</h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rendez-vous</Label>
                  <p className="text-sm text-muted-foreground">Rappels et confirmations de rendez-vous</p>
                </div>
                <Switch
                  checked={notifications.appointments}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Messages</Label>
                  <p className="text-sm text-muted-foreground">Nouveaux messages de vos praticiens</p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing</Label>
                  <p className="text-sm text-muted-foreground">Offres spéciales et nouveautés</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Langue et région
          </CardTitle>
          <CardDescription>Personnalisez votre expérience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Langue</Label>
            <Select defaultValue="fr">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Fuseau horaire</Label>
            <Select defaultValue="europe-lisbon">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe-lisbon">Europe/Lisbon (GMT+0)</SelectItem>
                <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Mode sombre
              </Label>
              <p className="text-sm text-muted-foreground">Basculer vers le thème sombre</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Sécurité et confidentialité
          </CardTitle>
          <CardDescription>Protégez votre compte et vos données</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Authentification à deux facteurs
              </Label>
              <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire</p>
            </div>
            <Button variant="outline">Activer</Button>
          </div>

          <div className="border-t pt-4">
            <Button variant="outline" className="w-full">
              Changer le mot de passe
            </Button>
          </div>

          <div>
            <Button variant="outline" className="w-full">
              Télécharger mes données
            </Button>
          </div>

          <div className="border-t pt-4">
            <Button variant="destructive" className="w-full">
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
