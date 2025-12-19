'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, MessageSquare, User, UserCheck } from 'lucide-react';
import { fakeAdminData } from '@/lib/fake-data';

export default function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const { supportTickets } = fakeAdminData;

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Ouvert</Badge>;
      case 'in_progress':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">En cours</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Résolu</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Haute</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-orange-400 text-orange-700">Moyenne</Badge>;
      case 'low':
        return <Badge variant="outline">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getUserIcon = (userType: string) => {
    return userType === 'professional' ? (
      <UserCheck className="h-4 w-4 text-green-600" />
    ) : (
      <User className="h-4 w-4 text-blue-600" />
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support client</h1>
        <p className="text-gray-500 mt-1">Gérer les tickets de support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tickets ouverts</CardTitle>
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {supportTickets.filter(t => t.status === 'open').length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Nécessitent une réponse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En cours</CardTitle>
            <MessageSquare className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {supportTickets.filter(t => t.status === 'in_progress').length}
            </div>
            <p className="text-sm text-gray-500 mt-1">En traitement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Résolus</CardTitle>
            <MessageSquare className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {supportTickets.filter(t => t.status === 'resolved').length}
            </div>
            <p className="text-sm text-gray-500 mt-1">Cette semaine</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tickets de support ({filteredTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par utilisateur ou sujet..."
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
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="resolved">Résolu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedTicket === ticket.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getUserIcon(ticket.userType)}
                        <span className="font-semibold text-gray-900">{ticket.user}</span>
                        <span className="text-sm text-gray-400">#{ticket.id.split('-')[1]}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{ticket.subject}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                        <Badge variant="outline" className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {ticket.messages}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</div>
                      <div className="text-xs text-gray-400 mt-1">Màj: {formatDate(ticket.lastUpdate)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détail du ticket</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTicket ? (
              <div className="space-y-4">
                {(() => {
                  const ticket = supportTickets.find(t => t.id === selectedTicket);
                  if (!ticket) return null;
                  return (
                    <>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Utilisateur</div>
                        <div className="flex items-center gap-2">
                          {getUserIcon(ticket.userType)}
                          <span className="font-medium">{ticket.user}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {ticket.userType === 'professional' ? 'Professionnel' : 'Patient'}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-1">Sujet</div>
                        <div className="font-medium">{ticket.subject}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Statut</div>
                          {getStatusBadge(ticket.status)}
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Priorité</div>
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-1">Messages</div>
                        <div className="text-2xl font-bold">{ticket.messages}</div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium text-gray-700 mb-2">Répondre au ticket</div>
                        <Textarea
                          rows={4}
                          placeholder="Votre réponse..."
                          className="mb-3"
                        />
                        <div className="flex gap-2">
                          <Select defaultValue="in_progress">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="open">Ouvert</SelectItem>
                              <SelectItem value="in_progress">En cours</SelectItem>
                              <SelectItem value="resolved">Résolu</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button className="bg-blue-600 hover:bg-blue-700 flex-1">
                            Envoyer
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Sélectionnez un ticket pour voir les détails</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
