import React from 'react';
import { WeatherDashboard } from '../components/weather/WeatherDashboard';
import { WeatherTabs } from '../components/weather/WeatherTabs';

export function Weather() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Weather Monitor</h1>
      <WeatherDashboard />
      <WeatherTabs />
    </div>
  );
}