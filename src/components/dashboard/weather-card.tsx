import { Cloud, Droplets, Sun, Wind } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MOCK_WEATHER } from '@/lib/constants';

export function WeatherCard() {
  const { current, forecast } = MOCK_WEATHER;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>5-day weather prediction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-yellow-500" />
              <div className="text-2xl font-bold">{current.temp}°C</div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4" />
                {current.windSpeed} km/h
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4" />
                {current.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <Cloud className="h-4 w-4" />
                {current.condition}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center rounded-lg border p-2 text-center"
              >
                <span className="text-sm font-medium">{day.day}</span>
                <Sun className="my-1 h-4 w-4 text-yellow-500" />
                <span className="text-sm">{day.temp}°C</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}