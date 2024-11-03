import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Droplet, Leaf, ThermometerSun } from 'lucide-react';

const impactMetrics = [
  {
    category: 'Water Requirements',
    current: 75,
    optimal: 65,
    status: 'above-optimal',
    icon: Droplet,
  },
  {
    category: 'Growth Conditions',
    current: 85,
    optimal: 80,
    status: 'optimal',
    icon: Leaf,
  },
  {
    category: 'Stress Level',
    current: 45,
    optimal: 30,
    status: 'warning',
    icon: ThermometerSun,
  },
];

const recommendations = [
  {
    title: 'Adjust Irrigation Schedule',
    description: 'Consider increasing evening watering duration by 15 minutes due to higher temperatures.',
    impact: 'medium',
  },
  {
    title: 'Monitor Soil Moisture',
    description: 'Expected rainfall may affect soil saturation levels. Prepare to adjust irrigation accordingly.',
    impact: 'high',
  },
];

export function WeatherImpact() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Current Impact Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {impactMetrics.map((metric) => (
            <div key={metric.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{metric.category}</span>
                </div>
                <Badge
                  variant={
                    metric.status === 'optimal'
                      ? 'default'
                      : metric.status === 'warning'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {metric.current}%
                </Badge>
              </div>
              <Progress
                value={metric.current}
                className={
                  metric.status === 'optimal'
                    ? 'text-primary'
                    : metric.status === 'warning'
                    ? 'text-destructive'
                    : 'text-secondary'
                }
              />
              <p className="text-sm text-muted-foreground">
                Optimal: {metric.optimal}%
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weather-Based Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <Alert key={index}>
              <AlertTitle className="flex items-center justify-between">
                {rec.title}
                <Badge variant={rec.impact === 'high' ? 'destructive' : 'secondary'}>
                  {rec.impact} impact
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-2">
                {rec.description}
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}