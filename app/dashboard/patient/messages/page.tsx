'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fakePatientData } from '@/lib/fake-data';
import {
  Send,
  Paperclip,
  Search,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const mockConversation = {
  '1': [
    {
      id: '1',
      sender: 'practitioner',
      message: 'Bonjour João, comment allez-vous depuis notre dernière consultation ?',
      timestamp: '2025-10-02T10:00:00',
    },
    {
      id: '2',
      sender: 'patient',
      message: 'Bonjour Dr. Costa, je me sens mieux, merci. Les médicaments fonctionnent bien.',
      timestamp: '2025-10-02T10:15:00',
    },
    {
      id: '3',
      sender: 'practitioner',
      message: 'Excellent ! Continuez le traitement comme prescrit. N\'oubliez pas votre prochain rendez-vous le 8 octobre.',
      timestamp: '2025-10-02T10:20:00',
    },
    {
      id: '4',
      sender: 'patient',
      message: 'Parfait, je serai là. Merci docteur !',
      timestamp: '2025-10-02T10:25:00',
    },
    {
      id: '5',
      sender: 'practitioner',
      message: 'Votre ordonnance est prête, je l\'ai ajoutée à vos documents.',
      timestamp: '2025-10-02T14:30:00',
    },
  ],
  '2': [
    {
      id: '1',
      sender: 'practitioner',
      message: 'Bonjour João, vos résultats d\'analyses sont arrivés.',
      timestamp: '2025-09-28T10:00:00',
    },
    {
      id: '2',
      sender: 'patient',
      message: 'Bonjour Dr. Ferreira, est-ce que tout est normal ?',
      timestamp: '2025-09-28T10:05:00',
    },
    {
      id: '3',
      sender: 'practitioner',
      message: 'Oui, tous les résultats sont dans les normes. Je les ai téléchargés dans vos documents.',
      timestamp: '2025-09-28T10:15:00',
    },
  ],
};

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = fakePatientData.messages.filter((msg) =>
    msg.practitioner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedMessages = selectedConversation
    ? mockConversation[selectedConversation as keyof typeof mockConversation]
    : [];

  const selectedPractitioner = fakePatientData.messages.find(
    (msg) => msg.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-1">Communiquez avec vos praticiens</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-320px)]">
              <div className="space-y-1 p-2">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedConversation(message.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedConversation === message.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <AvatarImage src={message.practitioner.photo} />
                          <AvatarFallback>
                            {message.practitioner.name.split(' ')[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        {message.unread > 0 && (
                          <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          >
                            {message.unread}
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-gray-900 truncate">
                            {message.practitioner.name}
                          </h3>
                          <span className="text-xs text-gray-500 flex-shrink-0">
                            {format(new Date(message.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {message.practitioner.specialty}
                        </p>
                        <p className="text-sm text-gray-700 truncate">
                          {message.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          {selectedConversation && selectedPractitioner ? (
            <CardContent className="p-0 flex flex-col h-full">
              <div className="p-4 border-b flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-gray-100">
                  <AvatarImage src={selectedPractitioner.practitioner.photo} />
                  <AvatarFallback>
                    {selectedPractitioner.practitioner.name.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedPractitioner.practitioner.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedPractitioner.practitioner.specialty}
                  </p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === 'patient' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === 'patient'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {format(new Date(msg.timestamp), "HH:mm", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Tapez votre message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>Sélectionnez une conversation pour commencer</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
