import { useState, useCallback } from 'react';
import { SensorData, PredictionResponse } from '../types';

interface HistoryEntry {
  timestamp: string;
  moisture: number;
  temperature: number;
  prediction: {
    need_irrigation: boolean;
    probability: number;
  };
}

export function useSensorHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addEntry = useCallback((sensorData: SensorData, prediction: PredictionResponse) => {
    setHistory(prev => [
      {
        timestamp: prediction.timestamp,
        moisture: sensorData.moisture,
        temperature: sensorData.temperature,
        prediction: {
          need_irrigation: prediction.need_irrigation,
          probability: prediction.probability
        }
      },
      ...prev.slice(0, 99) // Keep last 100 entries
    ]);
  }, []);

  return {
    history,
    addEntry
  };
}