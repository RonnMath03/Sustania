import { format } from 'date-fns';

interface ForecastDay {
  date: string;
  temp: { high: number; low: number };
  conditions: string;
  rain: number;
  wind: number;
  humidity: number;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
}

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-center">
        No forecast data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl border border-gray-100 text-center"
        >
          <h3 className="font-medium text-gray-900">
            {format(new Date(day.date), 'EEEE')}
          </h3>
          
          <div className="my-3">
            {getWeatherIcon(day.conditions)}
          </div>
          
          <div className="text-2xl font-semibold text-gray-900">
            {day.temp.high}°C
          </div>
          
          <div className="text-sm text-gray-500">
            L: {day.temp.low}°
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
            <div>Rain: {day.rain}%</div>
            <div>Wind: {day.wind} km/h</div>
            <div>Humidity: {day.humidity}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getWeatherIcon(condition: string): React.ReactNode {
  const icons: Record<string, string> = {
    'sunny': '☀️',
    'partly-cloudy': '⛅',
    'cloudy': '☁️',
    'rain': '🌧️',
    'storm': '⛈️',
  };
  
  return icons[condition] || '☀️';
}