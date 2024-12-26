import React from 'react';
import { format } from 'date-fns';
import { Droplets, ThermometerSun, RefreshCw } from 'lucide-react';
import { Button } from '../Button';
import { useSensorData } from '../../hooks/useSensorData';
import { usePrediction } from '../../hooks/usePrediction';

export function SensorDisplay() {
  const { 
    data: sensorData, 
    isLoading: isSensorLoading, 
    error: sensorError,
    lastUpdate,
    isManualFetching,
    manualRefresh
  } = useSensorData();

  const {
    prediction,
    isLoading: isPredictionLoading,
    getPrediction
  } = usePrediction();

  const handleGetPrediction = async () => {
    if (!sensorData) return;
    await getPrediction(sensorData);
  };

  if (sensorError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">Failed to load sensor data: {sensorError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sensor Data */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Sensor Data</h2>
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
            <div className="flex items-center gap-2 text-blue-600">
              <Droplets className="w-5 h-5" />
              <span className="text-sm font-medium">Soil Moisture</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900">
              {sensorData?.moisture ?? '--'}
            </div>
            <div className="text-sm text-gray-500">
              Valid range: 400-900
            </div>
            {sensorData?.moisture && (
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${((sensorData.moisture - 400) / 500) * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          {/* Temperature Reading */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600">
              <ThermometerSun className="w-5 h-5" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="text-3xl font-semibold text-gray-900">
              {sensorData?.temperature ? `${sensorData.temperature}°C` : '--'}
            </div>
            <div className="text-sm text-gray-500">
              Valid range: 0-40°C
            </div>
            {sensorData?.temperature && (
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 transition-all duration-500"
                  style={{
                    width: `${(sensorData.temperature / 40) * 100}%`
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {lastUpdate && (
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {format(new Date(lastUpdate), 'PPp')}
            {isSensorLoading && ' (Updating...)'}
          </div>
        )}
      </div>

      {/* ML Prediction */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">ML Prediction</h2>
          <Button
            onClick={handleGetPrediction}
            disabled={isPredictionLoading || !sensorData}
          >
            {isPredictionLoading ? 'Getting Prediction...' : 'Get Prediction'}
          </Button>
        </div>

        {prediction ? (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              prediction.need_irrigation
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            } border`}>
              <h3 className="text-lg font-medium mb-2">
                {prediction.need_irrigation
                  ? 'Irrigation Recommended'
                  : 'No Irrigation Needed'}
              </h3>
              <p className="text-sm text-gray-600">
                {prediction.need_irrigation
                  ? 'Based on current conditions, irrigation is recommended.'
                  : 'Current soil moisture levels are adequate.'}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Confidence</span>
                <span className="text-lg font-semibold text-green-600">
                  {Math.round(prediction.confidence * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-500"
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Last prediction: {format(new Date(prediction.timestamp), 'PPp')}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No prediction available. Click "Get Prediction" to analyze current conditions.</p>
          </div>
        )}
      </div>
    </div>
  );
}