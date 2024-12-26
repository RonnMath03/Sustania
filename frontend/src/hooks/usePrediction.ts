import { useState } from 'react';
import { SensorData, PredictionResponse } from '../types';
import { sensorsApi } from '../api/sensors';
import { usePredictionStore } from '../store/predictionStore';
import toast from 'react-hot-toast';

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const addPrediction = usePredictionStore((state) => state.addPrediction);

  const getPrediction = async (data: SensorData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await sensorsApi.getPrediction(data);
      setPrediction(response);
      addPrediction(data, response);
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