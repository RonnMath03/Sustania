import { useState } from 'react';
import { SensorData, PredictionResponse } from '../types';
import { sensorsApi } from '../api/sensors';
import toast from 'react-hot-toast';

export function useSensorPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getPrediction = async (data: SensorData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sensorsApi.getPrediction({
        moisture: data.moisture,
        temperature: data.temperature
      });
      setPrediction(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get prediction');
      setError(error);
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    prediction,
    isLoading,
    error,
    getPrediction
  };
}