'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, UserCheck, Calendar, FileText, Headphones, Settings, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Vue d\'ensemble', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Utilisateurs', href: '/dashboard/admin/users', icon: Users },
  { name: 'Professionnels', href: '/dashboard/admin/professionals', icon: UserCheck },
  { name: 'Rendez-vous', href: '/dashboard/admin/appointments', icon: Calendar },
  { name: 'Contenu', href: '/dashboard/admin/content', icon: FileText },
  { name: 'Support', href: '/dashboard/admin/support', icon: Headphones },
  { name: 'Paramètres', href: '/dashboard/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-64 border-r border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-6 pb-5 border-b bg-gradient-to-r from-purple-50 to-white">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div className="ml-3">
            <span className="text-xl font-bold text-gray-900">Health Finder</span>
            <p className="text-xs text-purple-600 font-medium">Administration</p>
          </div>
        </div>
        <nav className="mt-8 flex-1 px-3 space-y-1">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all relative overflow-hidden animate-fade-in
                  ${isActive
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                  }
                `}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white animate-pulse' : 'text-gray-400 group-hover:text-purple-600'
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="absolute right-2 h-2 w-2 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border hover:bg-purple-50 hover:border-purple-300 transition-all hover:scale-110 active:scale-95"
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
