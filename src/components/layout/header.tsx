import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { userAtom, isAuthenticatedAtom } from '@/lib/store';
import { COMPANY, ROUTES } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SystemNotificationCenter } from '@/components/notifications/system-notification-center';
import { UserMenu } from '@/components/layout/user-menu';
import { SettingsMenu } from '@/components/settings/settings-menu';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Desktop Logo */}
        <div className="ml-4 mr-4 hidden md:flex justify-items-center items-center">
          <img 
            src="/src/components/img/logo.png" 
            alt="Sustania Logo" 
            className="h-7 w-7 mr-2 object-contain"
          />
          <a href={ROUTES.DASHBOARD} className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">{COMPANY.name}</span>
          </a>
        </div>

        {/* Mobile Logo - Centered */}
        <div className="flex md:hidden flex-1 items-center">
          <img 
            src="/src/components/img/logo.png" 
            alt="Sustania Logo" 
            className="h-7 w-7 ml-2 mr-1 object-contain"
          />
          <span className="font-bold text-2xl text-primary">{COMPANY.name}</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <SystemNotificationCenter />
          {isAuthenticated && (
            <>
              <UserMenu user={user} />
              <SettingsMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
}