import { useState } from 'react';
import { Bell, Download, Filter, MailCheck, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from './notification-provider';
import { exportData } from '@/lib/export';

interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'system' | 'alert' | 'update';
  priority: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
}

const mockNotifications: SystemNotification[] = [
  {
    id: '1',
    title: 'Critical Weather Alert',
    message: 'Heavy rainfall expected in your area. Irrigation schedules have been automatically adjusted.',
    type: 'alert',
    priority: 'high',
    timestamp: new Date(),
    read: false,
  },
  {
    id: '2',
    title: 'System Update Available',
    message: 'A new system update (v2.1.0) is available with improved irrigation controls.',
    type: 'system',
    priority: 'medium',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: '3',
    title: 'Sensor Maintenance Required',
    message: 'Zone 2 moisture sensor requires calibration. Schedule maintenance.',
    type: 'update',
    priority: 'medium',
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
];

export function SystemNotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const { addNotification } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addNotification({
      type: 'success',
      title: 'Notifications Updated',
      message: 'All notifications marked as read',
    });
  };

  const handleRemove = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleExport = async () => {
    try {
      await exportData({
        filename: 'notifications-export',
        format: 'csv',
        data: notifications.map(n => ({
          title: n.title,
          message: n.message,
          type: n.type,
          priority: n.priority,
          timestamp: n.timestamp.toISOString(),
          status: n.read ? 'Read' : 'Unread',
        })),
      });

      addNotification({
        type: 'success',
        title: 'Export Successful',
        message: 'Notifications exported to CSV',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Export Failed',
        message: 'Failed to export notifications',
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-[400px] z-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={handleExport}
              >
                <Download className="mr-1 h-3 w-3" />
                Export
              </Button>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={handleMarkAllAsRead}
                >
                  <MailCheck className="mr-1 h-3 w-3" />
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="alerts" className="flex-1">Alerts</TabsTrigger>
                <TabsTrigger value="system" className="flex-1">System</TabsTrigger>
                <TabsTrigger value="updates" className="flex-1">Updates</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[400px] mt-2">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Bell className="h-8 w-8 mb-2" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 border-b last:border-0 ${
                        !notification.read ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <Badge
                              variant="outline"
                              className={`mt-1 ${getPriorityColor(
                                notification.priority
                              )}`}
                            >
                              {notification.priority} priority
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleRemove(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}