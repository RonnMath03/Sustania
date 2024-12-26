import React from 'react';
import { usePrediction } from '../../hooks/usePrediction';

export default function PredictionCard() {
  const { prediction, isLoading, error } = usePrediction();

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
        <p className="text-red-500">Error loading prediction data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">ML Prediction</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Irrigation Needed</p>
          <p className="text-2xl font-semibold text-gray-900">
            {prediction?.need_irrigation ? 'Yes' : 'No'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Confidence</p>
          <p className="text-2xl font-semibold text-gray-900">
            {Math.round((prediction?.probability || 0) * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}