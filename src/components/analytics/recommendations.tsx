import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    title: 'Optimize Irrigation Schedule',
    description: 'Adjust watering times to early morning to reduce evaporation loss. Potential water savings of 15%.',
    impact: 'high',
    category: 'water',
    savings: '$450/month',
  },
  {
    id: 2,
    title: 'Crop Rotation Suggestion',
    description: 'Consider rotating wheat with legumes in Zone 3 to improve soil nitrogen content.',
    impact: 'medium',
    category: 'crops',
    savings: '$300/season',
  },
  {
    id: 3,
    title: 'Equipment Maintenance',
    description: 'Schedule preventive maintenance for pumps in Zone 1 and 4 to prevent efficiency loss.',
    impact: 'medium',
    category: 'equipment',
    savings: '$200/month',
  },
  {
    id: 4,
    title: 'Critical: Soil pH Adjustment',
    description: 'Soil pH in Zone 2 is below optimal levels. Consider applying lime to adjust pH levels.',
    impact: 'high',
    category: 'soil',
    savings: '$600/season',
  },
];

export function Recommendations() {
  return (
    <div className="grid gap-4 grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec) => (
            <Alert key={rec.id} variant={rec.impact === 'high' ? 'destructive' : 'default'}>
              <AlertTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {rec.impact === 'high' ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <TrendingUp className="h-4 w-4" />
                  )}
                  {rec.title}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant={rec.impact === 'high' ? 'destructive' : 'secondary'}>
                    {rec.impact} impact
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {rec.savings}
                  </Badge>
                </div>
              </AlertTitle>
              <AlertDescription className="mt-2">
                {rec.description}
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Potential Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$1,550</div>
            <p className="text-sm text-muted-foreground">per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Efficiency Gain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">+23%</div>
            <p className="text-sm text-muted-foreground">estimated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">ROI Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 months</div>
            <p className="text-sm text-muted-foreground">average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}