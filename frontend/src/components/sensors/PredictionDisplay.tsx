import React from 'react';
import { PredictionResponse } from '../../types';
import { format } from 'date-fns';
import { Droplets, ThermometerSun } from 'lucide-react';

interface PredictionDisplayProps {
  prediction: PredictionResponse;
  isLoading?: boolean;
}

export function PredictionDisplay({ prediction, isLoading }: PredictionDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const confidenceColor = prediction.confidence > 0.7 
    ? 'text-green-600' 
    : prediction.confidence > 0.4 
      ? 'text-yellow-600' 
      : 'text-red-600';

  const confidenceBg = prediction.confidence > 0.7 
    ? 'bg-green-50' 
    : prediction.confidence > 0.4 
      ? 'bg-yellow-50' 
      : 'bg-red-50';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">ML Model Prediction</h2>
      
      <div className="space-y-4">
        {/* Main Prediction */}
        <div className={`${
          prediction.need_irrigation ? 'bg-green-50' : 'bg-red-50'
        } p-4 rounded-lg border ${
          prediction.need_irrigation ? 'border-green-200' : 'border-red-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Droplets className={
              prediction.need_irrigation ? 'text-green-600' : 'text-red-600'
            } />
            <h3 className="text-lg font-medium">
              {prediction.need_irrigation ? 'Irrigation Recommended' : 'No Irrigation Needed'}
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            {prediction.need_irrigation 
              ? 'Based on current conditions, irrigation is recommended for optimal soil moisture.'
              : 'Current soil moisture levels are adequate. No irrigation needed at this time.'}
          </p>
        </div>

        {/* Confidence Level */}
        <div className={`${confidenceBg} p-4 rounded-lg border`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ThermometerSun className={confidenceColor} />
              <h3 className="font-medium">Model Confidence</h3>
            </div>
            <span className={`${confidenceColor} text-lg font-semibold`}>
              {Math.round(prediction.confidence * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${confidenceColor.replace('text-', 'bg-')}`}
              style={{ width: `${prediction.confidence * 100}%` }}
            />
          </div>
        </div>

        {/* Timestamp */}
        <div className="text-sm text-gray-500">
          Last Updated: {format(new Date(prediction.timestamp), 'PPpp')}
        </div>
      </div>
    </div>
  );
}