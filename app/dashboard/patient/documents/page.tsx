'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fakePatientData } from '@/lib/fake-data';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Search,
  Eye,
  Pill,
  FlaskConical,
  Scan,
  FileCheck,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const documentTypeIcons = {
  prescription: Pill,
  'lab-results': FlaskConical,
  imaging: Scan,
  report: FileCheck,
};

const documentTypeLabels = {
  prescription: 'Ordonnance',
  'lab-results': 'Résultats analyses',
  imaging: 'Imagerie',
  report: 'Compte-rendu',
};

const documentTypeColors = {
  prescription: 'bg-blue-100 text-blue-700',
  'lab-results': 'bg-green-100 text-green-700',
  imaging: 'bg-purple-100 text-purple-700',
  report: 'bg-orange-100 text-orange-700',
};

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = fakePatientData.documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.practitioner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const DocumentCard = ({ document }: any) => {
    const Icon = documentTypeIcons[document.type as keyof typeof documentTypeIcons] || FileText;
    const colorClass = documentTypeColors[document.type as keyof typeof documentTypeColors] || 'bg-gray-100 text-gray-700';

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
              <Icon className="h-6 w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{document.name}</h3>
                  <p className="text-sm text-gray-600">{document.practitioner}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                <Badge variant="outline" className="text-xs">
                  {documentTypeLabels[document.type as keyof typeof documentTypeLabels]}
                </Badge>
                <span>{format(new Date(document.date), "d MMM yyyy", { locale: fr })}</span>
                <span>{document.size}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              Voir
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes documents</h1>
          <p className="text-gray-600 mt-1">Tous vos documents médicaux au même endroit</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Importer un document
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un document..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="all">
            Tous
            <Badge variant="secondary" className="ml-2">
              {fakePatientData.documents.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="prescription">
            <Pill className="h-4 w-4 mr-1" />
            Ordonnances
          </TabsTrigger>
          <TabsTrigger value="lab-results">
            <FlaskConical className="h-4 w-4 mr-1" />
            Analyses
          </TabsTrigger>
          <TabsTrigger value="imaging">
            <Scan className="h-4 w-4 mr-1" />
            Imagerie
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileCheck className="h-4 w-4 mr-1" />
            Rapports
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {filteredDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Aucun document trouvé</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="border-2 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Importez vos documents médicaux
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Gardez tous vos documents médicaux en sécurité et accessibles
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choisir un fichier
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
