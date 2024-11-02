import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Cloud,
  Home,
  MessageSquare,
  Droplet,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/lib/constants';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant={isActive(ROUTES.DASHBOARD) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.DASHBOARD)}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={isActive(ROUTES.IRRIGATION) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.IRRIGATION)}
            >
              <Droplet className="mr-2 h-4 w-4" />
              Irrigation
            </Button>
            <Button
              variant={isActive(ROUTES.ANALYTICS) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.ANALYTICS)}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant={isActive(ROUTES.FORUM) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.FORUM)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Forum
            </Button>
            <Button
              variant={isActive(ROUTES.WEATHER) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.WEATHER)}
            >
              <Cloud className="mr-2 h-4 w-4" />
              Weather
            </Button>
            <Button
              variant={isActive(ROUTES.SUPPORT) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(ROUTES.SUPPORT)}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}