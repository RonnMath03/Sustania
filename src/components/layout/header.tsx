import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { COMPANY, ROUTES } from '@/lib/constants';
import { userAtom, isAuthenticatedAtom } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: 'Logged out successfully',
      description: 'Come back soon!',
    });
    navigate(ROUTES.LOGIN);
  };

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
        <div className="mr-4 hidden md:flex">
          <img 
            src="src/components/img/logo.png" 
            alt="Sustania Logo" 
            className="h-12 w-12 mb-2 object-contain"
          />
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">{COMPANY.name}</span>
          </a>
        </div>

        {/* Mobile Logo - Centered */}
          <img 
              src="src/components/img/logo.png" 
              alt="Sustania Logo" 
              className="h-6 w-6 mb-2 object-contain"
            />
        <div className="flex md:hidden flex-1 justify-center">
          <span className="font-bold text-xl text-primary">{COMPANY.name}</span>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}