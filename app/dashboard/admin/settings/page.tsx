'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, Mail, CreditCard, Globe, Database } from 'lucide-react';
import { fakeAdminData } from '@/lib/fake-data';

export default function AdminSettingsPage() {
  const { systemSettings } = fakeAdminData;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres système</h1>
        <p className="text-gray-500 mt-1">Configuration de la plateforme</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Général
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Apparence
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Paiements
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Database className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration générale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la plateforme
                </label>
                <Input defaultValue={systemSettings.general.platformName} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de support
                </label>
                <Input type="email" defaultValue={systemSettings.general.supportEmail} />
                <p className="text-xs text-gray-500 mt-1">
                  Les utilisateurs recevront les réponses de support depuis cette adresse
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de contact
                </label>
                <Input type="email" defaultValue={systemSettings.general.contactEmail} />
                <p className="text-xs text-gray-500 mt-1">
                  Email affiché dans les pages de contact
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Langues actives
                </label>
                <div className="flex gap-4">
                  {['FR', 'PT', 'EN', 'ES'].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Switch
                        id={`lang-${lang}`}
                        defaultChecked={systemSettings.general.activeLanguages.includes(lang)}
                      />
                      <label
                        htmlFor={`lang-${lang}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          {lang}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personnalisation visuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de la plateforme
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg border-2 border-gray-200 overflow-hidden">
                    <img
                      src={systemSettings.general.logo}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button variant="outline">Changer le logo</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      defaultValue={systemSettings.general.primaryColor}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      defaultValue={systemSettings.general.primaryColor}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      defaultValue={systemSettings.general.secondaryColor}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      defaultValue={systemSettings.general.secondaryColor}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-3">Aperçu</div>
                <div className="flex gap-2">
                  <div
                    className="h-12 w-24 rounded"
                    style={{ backgroundColor: systemSettings.general.primaryColor }}
                  />
                  <div
                    className="h-12 w-24 rounded"
                    style={{ backgroundColor: systemSettings.general.secondaryColor }}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des paiements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Modes de paiement acceptés
                </label>
                <div className="space-y-2">
                  {systemSettings.payment.acceptedMethods.map((method) => (
                    <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-900">{method}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission de la plateforme
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    defaultValue={systemSettings.payment.platformCommission}
                    className="w-32"
                  />
                  <span className="text-gray-600">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Pourcentage prélevé sur chaque transaction
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Devise
                </label>
                <Input defaultValue={systemSettings.payment.currency} className="w-32" disabled />
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Enregistrer les modifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Database className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Logs système</h3>
                <p className="text-gray-500 mb-4">
                  Accès aux logs d'activité du système et de la base de données
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline">Voir les logs d'erreurs</Button>
                  <Button variant="outline">Voir les logs d'accès</Button>
                  <Button variant="outline">Exporter les logs</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
