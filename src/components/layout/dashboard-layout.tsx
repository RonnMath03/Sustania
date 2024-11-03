import { useState } from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[240px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden absolute left-4 top-3 z-50"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <SheetHeader className="px-4 py-2">
              <SheetTitle>{COMPANY.name}</SheetTitle>
            </SheetHeader>
            <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}