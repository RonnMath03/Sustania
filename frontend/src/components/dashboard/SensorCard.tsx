import React from 'react';
import { useSensorData } from '../../hooks/useSensorData';

export default function SensorCard() {
  const { data: sensorData, isLoading, error } = useSensorData();

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
        <p className="text-red-500">Error loading sensor data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sensor Data</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Soil Moisture</p>
          <p className="text-2xl font-semibold text-gray-900">
            {sensorData?.moisture || '--'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Temperature</p>
          <p className="text-2xl font-semibold text-gray-900">
            {sensorData?.temperature || '--'}°C
          </p>
        </div>
      </div>
    </div>
  );
}