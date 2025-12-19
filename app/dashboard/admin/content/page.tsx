'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard as Edit, Plus, Trash2, Globe } from 'lucide-react';
import { fakeAdminData } from '@/lib/fake-data';

export default function AdminContentPage() {
  const [activeLanguage, setActiveLanguage] = useState('FR');
  const { faqItems } = fakeAdminData;

  const staticPages = [
    { id: '1', title: 'À propos', slug: 'about', lastUpdated: '2025-09-15' },
    { id: '2', title: 'FAQ', slug: 'faq', lastUpdated: '2025-10-01' },
    { id: '3', title: 'Conditions générales', slug: 'terms', lastUpdated: '2025-08-20' },
    { id: '4', title: 'Politique de confidentialité', slug: 'privacy', lastUpdated: '2025-08-20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion du contenu</h1>
        <p className="text-gray-500 mt-1">Gérer les pages statiques et la FAQ</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Pages statiques</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pages statiques</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Button
                      variant={activeLanguage === 'FR' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveLanguage('FR')}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      FR
                    </Button>
                    <Button
                      variant={activeLanguage === 'PT' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveLanguage('PT')}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      PT
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle page
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staticPages.map((page) => (
                  <div key={page.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{page.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">/{page.slug}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">
                            Modifié le {new Date(page.lastUpdated).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Éditeur de contenu</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Sélectionnez une page ci-dessus pour l'éditer. Éditeur WYSIWYG disponible pour une modification visuelle.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <Input placeholder="Titre de la page" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                    <Textarea
                      rows={10}
                      placeholder="Contenu de la page (éditeur WYSIWYG à intégrer)"
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Enregistrer</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Questions fréquentes</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <Button
                      variant={activeLanguage === 'FR' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveLanguage('FR')}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      FR
                    </Button>
                    <Button
                      variant={activeLanguage === 'PT' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveLanguage('PT')}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      PT
                    </Button>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une question
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {activeLanguage === 'FR' ? item.questionFR : item.questionPT}
                          </h3>
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          {item.active && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Actif</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {activeLanguage === 'FR' ? item.answerFR : item.answerPT}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 border rounded-lg bg-gray-50">
                <h3 className="font-semibold text-gray-900 mb-4">Ajouter / Modifier une question</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <Input placeholder="Ex: Général, Rendez-vous, Paiement" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question (FR)</label>
                      <Input placeholder="Question en français" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Question (PT)</label>
                      <Input placeholder="Pergunta em português" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Réponse (FR)</label>
                      <Textarea rows={4} placeholder="Réponse en français" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Réponse (PT)</label>
                      <Textarea rows={4} placeholder="Resposta em português" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Enregistrer</Button>
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
