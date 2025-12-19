'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fakeClientData } from '@/lib/fake-data';
import { Send, Paperclip, Phone, Video, MoveVertical as MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(fakeClientData.messages[0]);
  const [messageInput, setMessageInput] = useState('');

  const mockMessages = [
    {
      id: '1',
      sender: 'practitioner',
      content: 'Bonjour, je confirme votre rendez-vous du 8 octobre.',
      timestamp: '2025-10-02T10:30:00',
    },
    {
      id: '2',
      sender: 'patient',
      content: 'Merci beaucoup. À quelle heure exactement ?',
      timestamp: '2025-10-02T10:35:00',
    },
    {
      id: '3',
      sender: 'practitioner',
      content: 'À 14h30. Pensez à apporter vos anciens résultats d\'analyses.',
      timestamp: '2025-10-02T10:37:00',
    },
    {
      id: '4',
      sender: 'patient',
      content: 'Parfait, je les ai. À bientôt !',
      timestamp: '2025-10-02T10:40:00',
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">Communiquez avec vos praticiens</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Conversations</h3>
            </div>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="p-2 space-y-1">
                {fakeClientData.messages.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full p-3 rounded-lg text-left hover:bg-slate-100 transition-colors ${
                      selectedConversation.id === conversation.id ? 'bg-slate-100' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.practitioner} />
                        <AvatarFallback>
                          {conversation.practitioner.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium truncate">{conversation.practitioner}</p>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(conversation.timestamp), 'HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.practitioner} />
                  <AvatarFallback>
                    {selectedConversation.practitioner.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.practitioner}</p>
                  <p className="text-xs text-muted-foreground">En ligne</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Video className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'patient'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'patient' ? 'text-blue-100' : 'text-muted-foreground'
                        }`}
                      >
                        {format(new Date(message.timestamp), 'HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Écrivez votre message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
