import create from 'zustand';
import { SensorData, PredictionResponse } from '../types';

interface AppState {
  currentSensorData: SensorData | null;
  lastPrediction: PredictionResponse | null;
  setCurrentSensorData: (data: SensorData) => void;
  setLastPrediction: (prediction: PredictionResponse) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSensorData: null,
  lastPrediction: null,
  setCurrentSensorData: (data) => set({ currentSensorData: data }),
  setLastPrediction: (prediction) => set({ lastPrediction: prediction }),
}));