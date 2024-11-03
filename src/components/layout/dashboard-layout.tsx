import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { COMPANY } from '@/lib/constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[240px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-[240px] p-0">
            <SheetHeader className="px-4 py-2">
              <SheetTitle>{COMPANY.name}</SheetTitle>
            </SheetHeader>
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 min-h-[calc(100vh-3.5rem)]">{children}</main>
      </div>
    </div>
  );
}