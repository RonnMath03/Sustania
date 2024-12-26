import React from 'react';
import { SensorHealth as SensorHealthType } from '../../types';

interface SensorHealthProps {
  health: SensorHealthType;
}

export function SensorHealth({ health }: SensorHealthProps) {
  const statusColors = {
    healthy: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  const batteryColor = health.batteryLevel > 50 
    ? 'text-green-600' 
    : health.batteryLevel > 20 
      ? 'text-yellow-600' 
      : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sensor Health</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${statusColors[health.status]}`}>
            {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Battery Level</p>
          <p className={`text-2xl font-semibold ${batteryColor}`}>
            {health.batteryLevel}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Update</p>
          <p className="text-sm text-gray-900">
            {new Date(health.lastUpdate).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}