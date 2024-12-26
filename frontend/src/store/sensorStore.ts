import { create } from 'zustand';
import { SensorData, SensorHealth, PredictionResponse } from '../types';

interface SensorStore {
  currentData: SensorData | null;
  health: SensorHealth;
  lastPrediction: PredictionResponse | null;
  setCurrentData: (data: SensorData) => void;
  setHealth: (health: SensorHealth) => void;
  setLastPrediction: (prediction: PredictionResponse) => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  currentData: null,
  health: {
    status: 'healthy',
    lastUpdate: new Date().toISOString(),
    batteryLevel: 100
  },
  lastPrediction: null,
  setCurrentData: (data) => set({ currentData: data }),
  setHealth: (health) => set({ health }),
  setLastPrediction: (prediction) => set({ lastPrediction: prediction }),
}));