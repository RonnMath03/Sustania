import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Home, 
  Droplets, 
  Cloud, 
  BarChart2,
  MessageSquare,
  HelpCircle, 
  User,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Irrigation', href: '/irrigation', icon: Droplets },
  { name: 'Weather', href: '/weather', icon: Cloud },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Forum', href: '/forum', icon: MessageSquare },
  { name: 'Support', href: '/support', icon: HelpCircle },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    setIsCollapsed(true);
  }, [location.pathname]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setIsCollapsed(true);
    } else if (isRightSwipe) {
      setIsCollapsed(false);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md touch-manipulation"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle menu"
      >
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 touch-none"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-200 ease-in-out
          ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
          lg:translate-x-0
          w-64 bg-white border-r border-gray-100
          touch-manipulation
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <Logo />
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overscroll-contain">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors touch-manipulation ${
                    isActive
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                  }`}
                  onClick={() => setIsCollapsed(true)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}