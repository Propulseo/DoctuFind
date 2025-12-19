'use client';

import { ClientSidebar } from '@/components/dashboard/client-sidebar';

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <ClientSidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
