import { useWeather } from '../../hooks/useWeather';
import { WeatherCard } from './WeatherCard';
import { WeatherForecast } from './WeatherForecast';

export function WeatherDashboard() {
  const { data: weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Failed to load weather data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Weather Monitor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WeatherCard
          title="Temperature"
          type="temperature"
          current={{
            temp: weather.current.temp,
            feelsLike: weather.current.temp - 2,
            optimalRange: '20-25°C'
          }}
        />
        
        <WeatherCard
          title="Humidity"
          type="humidity"
          current={{
            temp: weather.current.humidity,
            optimalRange: '40-60%'
          }}
        />
        
        <WeatherCard
          title="Wind Speed"
          type="wind"
          current={{
            temp: 12,
            direction: 'NE'
          }}
        />
        
        <WeatherCard
          title="Conditions"
          type="conditions"
          current={{
            temp: weather.current.conditions,
            lastUpdated: '5m ago'
          }}
        />
      </div>

      {weather.forecast && weather.forecast.length > 0 && (
        <WeatherForecast forecast={weather.forecast} />
      )}
    </div>
  );
}