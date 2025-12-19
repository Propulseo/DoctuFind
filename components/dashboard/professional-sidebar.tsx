'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Calendar, Users, Briefcase, ChartBar as BarChart3, CreditCard, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fakeProfessionalData } from '@/lib/fake-data';
import { useState } from 'react';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard/professional', icon: LayoutDashboard },
  { name: 'Mon agenda', href: '/dashboard/professional/agenda', icon: Calendar },
  { name: 'Mes patients', href: '/dashboard/professional/patients', icon: Users },
  { name: 'Mes services', href: '/dashboard/professional/services', icon: Briefcase },
  { name: 'Statistiques', href: '/dashboard/professional/statistics', icon: BarChart3 },
  { name: 'Paiements', href: '/dashboard/professional/payments', icon: CreditCard },
  { name: 'Mon profil', href: '/dashboard/professional/profile', icon: User },
  { name: 'Paramètres', href: '/dashboard/professional/settings', icon: Settings },
];

export function ProfessionalSidebar() {
  const pathname = usePathname();
  const profile = fakeProfessionalData.profile;
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full w-64 flex-col border-r bg-background shadow-sm">
      <div className="p-6 bg-gradient-to-r from-green-50 to-white border-b">
        <Link href="/dashboard/professional" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
            MS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">Health Finder</span>
            <span className="text-xs text-green-600 font-medium">Professionnel</span>
          </div>
        </Link>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group relative overflow-hidden animate-fade-in',
                  isActive
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-muted-foreground hover:bg-green-50 hover:text-green-700'
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
      </div>

      <Separator />

      <div className="p-4 bg-gray-50">
        <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-white to-green-50 p-3 border-2 border-green-100 shadow-sm hover:shadow-md transition-all">
          <Avatar className="ring-2 ring-green-200">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-200 text-green-700 font-bold">MS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-gray-900">{profile.name}</p>
            <p className="text-xs text-green-600 truncate font-medium">{profile.specialty}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full mt-2 justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          asChild
        >
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border hover:bg-green-50 hover:border-green-300 transition-all hover:scale-110 active:scale-95"
      >
        {mobileOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
      </button>

      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden animate-slide-in-right">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
