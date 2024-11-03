import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { date: '2024-01', actual: 2400, predicted: 2600, optimal: 2200 },
  { date: '2024-02', actual: 1398, predicted: 1450, optimal: 1300 },
  { date: '2024-03', actual: 9800, predicted: 9600, optimal: 9000 },
  { date: '2024-04', actual: 3908, predicted: 4000, optimal: 3500 },
  { date: '2024-05', actual: 4800, predicted: 4700, optimal: 4200 },
  { date: '2024-06', actual: 3800, predicted: 3900, optimal: 3400 },
];

export function WaterUsageAnalytics() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Water Usage Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                name="Actual Usage"
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--muted-foreground))" 
                name="Predicted"
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                stroke="hsl(var(--destructive))" 
                name="Optimal Level"
                strokeDasharray="3 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}