import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CloudRain, Thermometer } from 'lucide-react';

const weatherAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Heavy Rain Warning',
    description: 'Heavy rainfall expected in the next 24 hours. Consider adjusting irrigation schedules.',
    timestamp: new Date(),
    impact: 'moderate',
    icon: CloudRain,
  },
  {
    id: 2,
    type: 'alert',
    title: 'High Temperature Alert',
    description: 'Temperatures expected to reach 35°C. Increased water needs likely.',
    timestamp: new Date(),
    impact: 'high',
    icon: Thermometer,
  },
];

export function WeatherAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Weather Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weatherAlerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type === 'warning' ? 'default' : 'destructive'}
          >
            <alert.icon className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-2">
              {alert.title}
              <Badge variant={alert.impact === 'high' ? 'destructive' : 'secondary'}>
                {alert.impact} impact
              </Badge>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <p>{alert.description}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Issued: {alert.timestamp.toLocaleTimeString()}
              </p>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}