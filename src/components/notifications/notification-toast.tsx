import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import type { Notification } from '@/lib/types';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Alert
      variant={notification.type === 'error' ? 'destructive' : 'default'}
      className="animate-slide-in-right w-[350px] shadow-lg"
    >
      <AlertTitle className="flex items-center justify-between">
        {notification.title}
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription>{notification.message}</AlertDescription>
    </Alert>
  );
}