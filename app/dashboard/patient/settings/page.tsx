'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  Lock,
  Globe,
  Eye,
  Shield,
  Smartphone,
  Mail,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Gérez comment vous recevez les notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notif" className="text-base">Notifications par email</Label>
                <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
              </div>
              <Switch
                id="email-notif"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notif" className="text-base">Notifications par SMS</Label>
                <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
              </div>
              <Switch
                id="sms-notif"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="appointment-reminders" className="text-base">
                  Rappels de rendez-vous
                </Label>
                <p className="text-sm text-gray-500">Rappels avant vos rendez-vous</p>
              </div>
              <Switch
                id="appointment-reminders"
                checked={appointmentReminders}
                onCheckedChange={setAppointmentReminders}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing" className="text-base">Emails marketing</Label>
                <p className="text-sm text-gray-500">Recevoir les actualités et offres</p>
              </div>
              <Switch
                id="marketing"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Fréquence des rappels</Label>
              <Select defaultValue="1day">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2hours">2 heures avant</SelectItem>
                  <SelectItem value="1day">1 jour avant</SelectItem>
                  <SelectItem value="2days">2 jours avant</SelectItem>
                  <SelectItem value="1week">1 semaine avant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Sécurité
            </CardTitle>
            <CardDescription>Protégez votre compte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
              <Input id="confirm-password" type="password" />
            </div>

            <Button className="w-full">Modifier le mot de passe</Button>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Authentification à deux facteurs</Label>
                <p className="text-sm text-gray-500">Sécurisez davantage votre compte</p>
              </div>
              <Switch />
            </div>

            <Button variant="outline" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Configurer 2FA
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Préférences
            </CardTitle>
            <CardDescription>Langue et apparence</CardDescription>
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
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="en">English</SelectItem>
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
                  <SelectItem value="europe-lisbon">Europe/Lisbonne</SelectItem>
                  <SelectItem value="europe-paris">Europe/Paris</SelectItem>
                  <SelectItem value="europe-london">Europe/Londres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format de date</Label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">JJ/MM/AAAA</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/JJ/AAAA</SelectItem>
                  <SelectItem value="yyyy-mm-dd">AAAA/MM/JJ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Mode sombre</Label>
                <p className="text-sm text-gray-500">Changer l'apparence de l'interface</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Confidentialité
            </CardTitle>
            <CardDescription>Contrôlez vos données</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Profil public</Label>
                <p className="text-sm text-gray-500">Permettre aux praticiens de vous trouver</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Partager l'historique</Label>
                <p className="text-sm text-gray-500">
                  Partager automatiquement l'historique avec les nouveaux praticiens
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-3 pt-2">
              <Button variant="outline" className="w-full justify-start">
                Télécharger mes données
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Exporter mon historique médical
              </Button>
            </div>

            <Separator />

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-900 mb-1">Zone de danger</h4>
                  <p className="text-sm text-red-700 mb-3">
                    Ces actions sont irréversibles. Procédez avec prudence.
                  </p>
                  <Button variant="destructive" size="sm">
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
