import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Cloud,
  Home,
  MessageSquare,
  Droplet,
  HelpCircle,
  LineChart,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/lib/constants';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <ScrollArea className={cn('h-full py-6', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant={isActive(ROUTES.DASHBOARD) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.DASHBOARD)}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={isActive(ROUTES.IRRIGATION) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.IRRIGATION)}
            >
              <Droplet className="mr-2 h-4 w-4" />
              Irrigation
            </Button>
            <Button
              variant={isActive(ROUTES.WEATHER) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.WEATHER)}
            >
              <Cloud className="mr-2 h-4 w-4" />
              Weather
            </Button>
            <Button
              variant={isActive(ROUTES.ANALYTICS) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.ANALYTICS)}
            >
              <LineChart className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant={isActive(ROUTES.FORUM) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.FORUM)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Forum
            </Button>
            <Button
              variant={isActive(ROUTES.SUPPORT) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.SUPPORT)}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </Button>
            <Button
              variant={isActive(ROUTES.PROFILE) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleNavigation(ROUTES.PROFILE)}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}