import { ProfessionalSidebar } from '@/components/dashboard/professional-sidebar';

export default function ProfessionalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <ProfessionalSidebar />
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  );
}
