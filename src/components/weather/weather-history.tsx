import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const historicalData = [
  { date: '2024-01', temp: 22, rainfall: 45, humidity: 65 },
  { date: '2024-02', temp: 24, rainfall: 30, humidity: 60 },
  { date: '2024-03', temp: 23, rainfall: 50, humidity: 70 },
  { date: '2024-04', temp: 25, rainfall: 35, humidity: 55 },
  { date: '2024-05', temp: 26, rainfall: 25, humidity: 50 },
  { date: '2024-06', temp: 28, rainfall: 20, humidity: 45 },
];

export function WeatherHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Weather Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temp"
                stroke="hsl(var(--primary))"
                name="Temperature (°C)"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                stroke="hsl(var(--secondary))"
                name="Rainfall (mm)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="humidity"
                stroke="hsl(var(--muted-foreground))"
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}