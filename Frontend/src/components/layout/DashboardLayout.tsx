import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { DashboardProvider } from '@/contexts/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />
          <main className="relative flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
