import React, { useEffect } from 'react';
import { useSensorPrediction } from '../../hooks/useSensorPrediction';
import { useRealtimeSensor } from '../../hooks/useRealtimeSensor';
import { Brain, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../Button';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function MLPredictionDisplay() {
  const { data: sensorData, isLoading: isSensorLoading, lastUpdate } = useRealtimeSensor();
  const { prediction, isLoading: isPredictionLoading, getPrediction } = useSensorPrediction();

  // Automatically get prediction when sensor data updates
  useEffect(() => {
    if (sensorData && lastUpdate) {
      handleGetPrediction();
    }
  }, [lastUpdate]);

  const handleGetPrediction = async () => {
    if (!sensorData) {
      toast.error('No sensor data available');
      return;
    }

    try {
      await getPrediction(sensorData);
    } catch (error) {
      toast.error('Failed to get prediction');
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-50';
    if (confidence >= 0.6) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  if (isSensorLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-medium text-gray-900">ML Prediction</h2>
        </div>
        <Button
          onClick={handleGetPrediction}
          disabled={isPredictionLoading || !sensorData}
        >
          {isPredictionLoading ? 'Getting Prediction...' : 'Get Prediction'}
        </Button>
      </div>

      {prediction ? (
        <div className="space-y-6">
          {/* Prediction Result */}
          <div className={`p-4 rounded-lg ${
            prediction.need_irrigation
              ? 'bg-green-50 border border-green-200'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {prediction.need_irrigation ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-600" />
              )}
              <span className="font-medium text-gray-900">
                {prediction.need_irrigation
                  ? 'Irrigation Recommended'
                  : 'No Irrigation Needed'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {prediction.need_irrigation
                ? 'Based on current conditions, irrigation is recommended for optimal soil moisture.'
                : 'Current soil moisture levels are adequate. No irrigation needed at this time.'}
            </p>
          </div>

          {/* Confidence Level */}
          <div className={`${getConfidenceBg(prediction.confidence)} p-4 rounded-lg border`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence Level</span>
              <span className={`${getConfidenceColor(prediction.confidence)} font-semibold`}>
                {Math.round(prediction.confidence * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${getConfidenceColor(prediction.confidence).replace('text', 'bg')}`}
                style={{ width: `${prediction.confidence * 100}%` }}
              />
            </div>
            {prediction.confidence < 0.6 && (
              <div className="flex items-center gap-2 mt-2 text-yellow-700 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Low confidence prediction. Consider manual verification.</span>
              </div>
            )}
          </div>

          {/* Sensor Data Used */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sensor Data Used</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Soil Moisture</span>
                <p className="font-medium text-gray-900">{sensorData?.moisture}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Temperature</span>
                <p className="font-medium text-gray-900">{sensorData?.temperature}°C</p>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="text-sm text-gray-500">
            Last prediction: {format(new Date(prediction.timestamp), 'PPpp')}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No prediction available. Click "Get Prediction" to analyze current conditions.</p>
        </div>
      )}
    </div>
  );
}