'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CircleCheck as CheckCircle, Circle as XCircle, Eye, FileCheck } from 'lucide-react';
import { fakeAdminData } from '@/lib/fake-data';

export default function AdminProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { professionals } = fakeAdminData;

  const filteredProfessionals = professionals.filter(pro => {
    const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pro.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pro.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pro.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'validated':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Validé</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En attente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeté</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des professionnels</h1>
        <p className="text-gray-500 mt-1">Valider et gérer les professionnels de santé</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Liste des professionnels ({filteredProfessionals.length})</CardTitle>
            <div className="flex gap-2 text-sm">
              <span className="text-green-600 font-medium">{fakeAdminData.kpis.validatedProfessionals} validés</span>
              <span className="text-gray-400">•</span>
              <span className="text-orange-600 font-medium">{fakeAdminData.kpis.pendingProfessionals} en attente</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, spécialité, numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="validated">Validé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="rejected">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N° enregistrement</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date inscription</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RDV</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annulation</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProfessionals.map((pro) => (
                  <tr key={pro.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{pro.name}</div>
                      <div className="text-sm text-gray-500">{pro.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pro.specialty}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-600">{pro.registrationNumber}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {pro.city}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(pro.registrationDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(pro.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {pro.documentsVerified ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          <FileCheck className="h-3 w-3 mr-1" />
                          Vérifiés
                        </Badge>
                      ) : (
                        <Badge variant="outline">En attente</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {pro.appointmentCount}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      {pro.status === 'validated' && (
                        <span className={`font-medium ${pro.cancellationRate > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                          {pro.cancellationRate}%
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {pro.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
