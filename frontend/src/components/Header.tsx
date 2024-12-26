import { useNavigate } from 'react-router-dom';
import { 
  Sun,
  Moon, 
  Bell, 
  Settings,
  Globe
} from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export function Header() {
  const navigate = useNavigate();
  const { isDark, toggle } = useThemeStore();
  const notifications = 3; // Example notification count

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-end h-16 px-6 gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggle}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full"
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full relative">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </button>

        {/* Region Selector */}
        <button className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2">
          <Globe className="w-4 h-4" />
          AU
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}