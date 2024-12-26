import React from 'react';
import { useWeather } from '../../hooks/useWeather';

export default function WeatherCard() {
  const { data: weather, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-red-500">Error loading weather data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Weather</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Current Temperature</p>
          <p className="text-2xl font-semibold text-gray-900">
            {weather?.current.temp || '--'}°C
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-2xl font-semibold text-gray-900">
            {weather?.current.humidity || '--'}%
          </p>
        </div>
      </div>
    </div>
  );
}