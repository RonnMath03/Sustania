import { AlertCircle, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

const mockAlerts: SystemAlert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Water Pressure',
    message: 'Zone 2 is experiencing lower than optimal water pressure',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'error',
    title: 'Sensor Malfunction',
    message: 'Moisture sensor in East Greenhouse needs attention',
    timestamp: new Date(),
  },
];

export function SystemAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">System Alerts</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type === 'error' ? 'destructive' : 'default'}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription className="text-sm">
              {alert.message}
              <div className="mt-1 text-xs text-muted-foreground">
                {alert.timestamp.toLocaleTimeString()}
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}