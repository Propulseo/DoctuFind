'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { fakeClientData } from '@/lib/fake-data';
import { FileText, Upload, Download, Eye, Trash2, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredDocuments = fakeClientData.documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.practitioner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ordonnance':
        return 'bg-blue-100 text-blue-700';
      case 'Résultats analyses':
        return 'bg-green-100 text-green-700';
      case 'Imagerie':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mes documents</h1>
          <p className="text-muted-foreground mt-1">Tous vos documents médicaux au même endroit</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          Importer un document
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{fakeClientData.documents.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ordonnances</p>
                <p className="text-2xl font-bold">
                  {fakeClientData.documents.filter(d => d.type === 'Ordonnance').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Analyses</p>
                <p className="text-2xl font-bold">
                  {fakeClientData.documents.filter(d => d.type === 'Résultats analyses').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Imagerie</p>
                <p className="text-2xl font-bold">
                  {fakeClientData.documents.filter(d => d.type === 'Imagerie').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un document..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Ordonnance">Ordonnances</SelectItem>
                <SelectItem value="Résultats analyses">Résultats analyses</SelectItem>
                <SelectItem value="Imagerie">Imagerie</SelectItem>
                <SelectItem value="Autres">Autres</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-slate-50 transition-colors"
              >
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getTypeColor(doc.type)}`}>
                  {getTypeIcon(doc.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{doc.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{doc.practitioner}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{doc.date}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Ajouter vos propres documents</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
            Importez vos documents médicaux personnels pour les garder en sécurité et accessibles
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Importer un document
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
