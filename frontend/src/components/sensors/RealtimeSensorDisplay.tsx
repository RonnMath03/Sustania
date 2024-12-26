import React from 'react';
import { useRealtimeSensor } from '../../hooks/useRealtimeSensor';
import { format } from 'date-fns';
import { Droplets, ThermometerSun, RefreshCw } from 'lucide-react';
import { Button } from '../Button';

export function RealtimeSensorDisplay() {
  const { 
    data, 
    isLoading, 
    error, 
    lastUpdate, 
    isManualFetching, 
    manualRefresh 
  } = useRealtimeSensor();

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-700 dark:text-red-400">Failed to load sensor data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Real-time Sensor Data</h2>
        <Button
          variant="outline"
          onClick={manualRefresh}
          disabled={isManualFetching}
          className="!p-2"
        >
          <RefreshCw className={`w-4 h-4 ${isManualFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moisture Reading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Droplets className="w-5 h-5" />
            <span className="text-sm font-medium">Soil Moisture</span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {data?.moisture ?? '--'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Valid range: 400-900
          </div>
          {data?.moisture && (
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500"
                style={{
                  width: `${((data.moisture - 400) / 500) * 100}%`
                }}
              />
            </div>
          )}
        </div>

        {/* Temperature Reading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <ThermometerSun className="w-5 h-5" />
            <span className="text-sm font-medium">Temperature</span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {data?.temperature ? `${data.temperature}°C` : '--'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Valid range: 0-40°C
          </div>
          {data?.temperature && (
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-600 dark:bg-orange-500 transition-all duration-500"
                style={{
                  width: `${(data.temperature / 40) * 100}%`
                }}
              />
            </div>
          )}
        </div>
      </div>

      {lastUpdate && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {format(new Date(lastUpdate), 'PPp')}
          {isLoading && ' (Updating...)'}
        </div>
      )}
    </div>
  );
}