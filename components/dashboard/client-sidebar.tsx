'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Chrome as Home, Search, Calendar, FileText, User, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { fakeClientData } from '@/lib/fake-data';

const menuItems = [
  { icon: Home, label: 'Accueil', href: '/dashboard/client' },
  { icon: Search, label: 'Rechercher', href: '/dashboard/client/search' },
  { icon: Calendar, label: 'Mes rendez-vous', href: '/dashboard/client/appointments' },
  { icon: FileText, label: 'Mes documents', href: '/dashboard/client/documents' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/client/messages' },
  { icon: User, label: 'Mon profil', href: '/dashboard/client/profile' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/client/settings' },
];

export function ClientSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  const sidebarContent = (
    <>
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-blue-200 hover:scale-110 transition-transform">
            <AvatarImage src={fakeClientData.profile.avatar} alt={fakeClientData.profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold">
              {fakeClientData.profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate text-gray-900">{fakeClientData.profile.name}</p>
            <p className="text-xs text-blue-600 truncate font-medium">{fakeClientData.profile.email}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 transition-all group relative overflow-hidden animate-fade-in',
                    isActive && 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  )}
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r flex flex-col transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>

      <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r flex-col">
        {sidebarContent}
      </aside>
    </>
  );
}
