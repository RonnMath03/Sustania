import { useState, useEffect } from 'react';
import { WeatherData } from '../types';

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWeather: WeatherData = {
          current: {
            temp: 23,
            humidity: 65,
            conditions: 'Partly Cloudy'
          },
          forecast: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
            temp: { high: 24 + i, low: 18 + i },
            conditions: 'partly-cloudy',
            rain: Math.floor(Math.random() * 100),
            wind: Math.floor(Math.random() * 30),
            humidity: Math.floor(Math.random() * 40 + 40)
          }))
        };

        setData(mockWeather);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch weather data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { data, isLoading, error };
}