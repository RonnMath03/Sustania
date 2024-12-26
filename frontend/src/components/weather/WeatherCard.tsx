import { 
  Thermometer,
  Droplets,
  Wind,
  Cloud
} from 'lucide-react';

interface CurrentWeather {
  temp: number;
  humidity: number;
  conditions: string;
  feelsLike?: number;
  optimalRange?: string;
  direction?: string;
  lastUpdated?: string;
}

interface WeatherCardProps {
  current: CurrentWeather;
  title: string;
  type: 'temperature' | 'humidity' | 'wind' | 'conditions';
}

const icons = {
  temperature: Thermometer,
  humidity: Droplets,
  wind: Wind,
  conditions: Cloud,
};

export function WeatherCard({ current, title, type }: WeatherCardProps) {
  const Icon = icons[type];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <h3 className="text-base font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold text-gray-900">
            {typeof current.temp === 'number' ? `${current.temp}°C` : current.temp}
          </span>
          {current.feelsLike && (
            <span className="ml-2 text-sm text-gray-500">
              Feels like {current.feelsLike}°C
            </span>
          )}
        </div>
        
        {current.optimalRange && (
          <p className="text-sm text-gray-500">
            Optimal range: {current.optimalRange}
          </p>
        )}
        
        {current.direction && (
          <p className="text-sm text-gray-500">
            Direction: {current.direction}
          </p>
        )}
        
        {current.lastUpdated && (
          <p className="text-xs text-gray-400 mt-2">
            Last updated: {current.lastUpdated}
          </p>
        )}
      </div>
    </div>
  );
}