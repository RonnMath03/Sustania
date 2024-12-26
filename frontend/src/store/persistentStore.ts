import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SensorData, PredictionResponse, SensorHealth } from '../types';

interface PersistentState {
  sensorHistory: Array<{
    data: SensorData;
    timestamp: string;
  }>;
  predictionHistory: Array<{
    prediction: PredictionResponse;
    timestamp: string;
  }>;
  sensorHealth: SensorHealth | null;
  lastSync: string | null;
  clearHistory: () => void;
  addSensorData: (data: SensorData) => void;
  addPrediction: (prediction: PredictionResponse) => void;
  updateSensorHealth: (health: SensorHealth) => void;
  updateLastSync: () => void;
}

export const usePersistentStore = create<PersistentState>()(
  persist(
    (set, get) => ({
      sensorHistory: [],
      predictionHistory: [],
      sensorHealth: null,
      lastSync: null,

      clearHistory: () => set({
        sensorHistory: [],
        predictionHistory: [],
        lastSync: new Date().toISOString()
      }),

      addSensorData: (data) => set((state) => ({
        sensorHistory: [
          {
            data,
            timestamp: new Date().toISOString()
          },
          ...state.sensorHistory.slice(0, 999) // Keep last 1000 entries
        ]
      })),

      addPrediction: (prediction) => set((state) => ({
        predictionHistory: [
          {
            prediction,
            timestamp: new Date().toISOString()
          },
          ...state.predictionHistory.slice(0, 999)
        ]
      })),

      updateSensorHealth: (health) => set({
        sensorHealth: health
      }),

      updateLastSync: () => set({
        lastSync: new Date().toISOString()
      })
    }),
    {
      name: 'sustania-storage',
      version: 1,
      partialize: (state) => ({
        sensorHistory: state.sensorHistory.slice(0, 100), // Only persist last 100 entries
        predictionHistory: state.predictionHistory.slice(0, 100),
        sensorHealth: state.sensorHealth,
        lastSync: state.lastSync
      })
    }
  )
);