import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

const extendedForecast = [
  { day: 'Monday', temp: 24, condition: 'Sunny', high: 26, low: 18, rain: 0, humidity: 45, wind: 12 },
  { day: 'Tuesday', temp: 23, condition: 'Partly Cloudy', high: 25, low: 17, rain: 10, humidity: 50, wind: 15 },
  { day: 'Wednesday', temp: 25, condition: 'Clear', high: 27, low: 19, rain: 0, humidity: 40, wind: 10 },
  { day: 'Thursday', temp: 22, condition: 'Rain', high: 23, low: 16, rain: 80, humidity: 75, wind: 20 },
  { day: 'Friday', temp: 21, condition: 'Showers', high: 22, low: 15, rain: 60, humidity: 70, wind: 18 },
  { day: 'Saturday', temp: 23, condition: 'Cloudy', high: 24, low: 17, rain: 20, humidity: 55, wind: 14 },
  { day: 'Sunday', temp: 25, condition: 'Sunny', high: 27, low: 18, rain: 0, humidity: 45, wind: 12 },
];

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case 'partly cloudy':
    case 'cloudy':
      return <CloudSun className="h-6 w-6 text-gray-500" />;
    case 'rain':
    case 'showers':
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    default:
      return <Cloud className="h-6 w-6 text-gray-500" />;
  }
};

export function WeatherForecast() {
  return (
    <div className="grid gap-4 grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>7-Day Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-7">
            {extendedForecast.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center p-4 rounded-lg border"
              >
                <span className="font-medium mb-2">{day.day}</span>
                {getWeatherIcon(day.condition)}
                <div className="mt-2 text-center">
                  <div className="text-2xl font-bold">{day.temp}°C</div>
                  <div className="text-sm text-muted-foreground">
                    H: {day.high}° L: {day.low}°
                  </div>
                </div>
                <div className="mt-2 text-sm text-center">
                  <div>Rain: {day.rain}%</div>
                  <div>Wind: {day.wind} km/h</div>
                  <div>Humidity: {day.humidity}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}