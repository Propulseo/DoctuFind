'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  Search,
  Calendar,
  FileText,
  User,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Accueil', href: '/dashboard/patient', icon: Home },
  { name: 'Rechercher', href: '/dashboard/patient/search', icon: Search },
  { name: 'Mes rendez-vous', href: '/dashboard/patient/appointments', icon: Calendar },
  { name: 'Mes documents', href: '/dashboard/patient/documents', icon: FileText },
  { name: 'Mon profil', href: '/dashboard/patient/profile', icon: User },
  { name: 'Messages', href: '/dashboard/patient/messages', icon: MessageSquare },
  { name: 'Paramètres', href: '/dashboard/patient/settings', icon: Settings },
];

export function PatientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    router.push('/');
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Health Finder</h2>
            <p className="text-xs text-blue-600 font-medium">Patient</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 py-6">
        <nav className="space-y-1 px-3">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden animate-fade-in',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                )}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive && "animate-pulse"
                )} />
                {item.name}
                {isActive && (
                  <div className="absolute right-2 h-2 w-2 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t p-4 bg-gray-50">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Déconnexion
        </Button>
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border hover:bg-blue-50 hover:border-blue-300 transition-all hover:scale-110 active:scale-95"
      >
        {mobileOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
      </button>

      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r shadow-sm">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r z-50 flex flex-col lg:hidden animate-slide-in-right shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
