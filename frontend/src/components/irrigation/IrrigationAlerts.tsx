import React from 'react';
import { Droplets } from 'lucide-react';
import { PredictionResponse } from '../../types';

interface IrrigationAlertsProps {
  prediction: PredictionResponse;
}

export function IrrigationAlerts({ prediction }: IrrigationAlertsProps) {
  if (!prediction.need_irrigation) return null;

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Droplets className="text-green-600" />
        <div>
          <h3 className="text-lg font-medium text-green-800">
            Irrigation Recommended
          </h3>
          <p className="text-sm text-green-700 mt-1">
            Based on current soil conditions, irrigation is recommended for optimal moisture levels.
            Confidence: {Math.round(prediction.probability * 100)}%
          </p>
        </div>
      </div>
    </div>
  );
}