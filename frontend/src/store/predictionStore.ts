import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SensorData, PredictionResponse } from '../types';

interface PredictionEntry {
  timestamp: string;
  sensorData: SensorData;
  prediction: PredictionResponse;
  actualOutcome?: boolean;
}

interface PredictionMetrics {
  accuracy: number;
  totalPredictions: number;
  truePositives: number;
  falsePositives: number;
  trueNegatives: number;
  falseNegatives: number;
  lastUpdated: string;
}

interface PredictionStore {
  predictions: PredictionEntry[];
  metrics: PredictionMetrics;
  addPrediction: (sensorData: SensorData, prediction: PredictionResponse) => void;
  updateOutcome: (timestamp: string, actualOutcome: boolean) => void;
  calculateMetrics: () => void;
  clearHistory: () => void;
}

const INITIAL_METRICS: PredictionMetrics = {
  accuracy: 0,
  totalPredictions: 0,
  truePositives: 0,
  falsePositives: 0,
  trueNegatives: 0,
  falseNegatives: 0,
  lastUpdated: new Date().toISOString()
};

export const usePredictionStore = create<PredictionStore>()(
  persist(
    (set, get) => ({
      predictions: [],
      metrics: INITIAL_METRICS,

      addPrediction: (sensorData, prediction) => {
        const newPrediction: PredictionEntry = {
          timestamp: new Date().toISOString(),
          sensorData,
          prediction
        };

        set((state) => ({
          predictions: [newPrediction, ...state.predictions].slice(0, 1000) // Keep last 1000 predictions
        }));

        get().calculateMetrics();
      },

      updateOutcome: (timestamp, actualOutcome) => {
        set((state) => ({
          predictions: state.predictions.map((pred) =>
            pred.timestamp === timestamp
              ? { ...pred, actualOutcome }
              : pred
          )
        }));

        get().calculateMetrics();
      },

      calculateMetrics: () => {
        const { predictions } = get();
        const predictionsWithOutcomes = predictions.filter(
          (p) => p.actualOutcome !== undefined
        );

        if (predictionsWithOutcomes.length === 0) {
          set({ metrics: INITIAL_METRICS });
          return;
        }

        const metrics = predictionsWithOutcomes.reduce(
          (acc, curr) => {
            if (curr.actualOutcome === curr.prediction.need_irrigation) {
              if (curr.prediction.need_irrigation) {
                acc.truePositives++;
              } else {
                acc.trueNegatives++;
              }
            } else {
              if (curr.prediction.need_irrigation) {
                acc.falsePositives++;
              } else {
                acc.falseNegatives++;
              }
            }
            return acc;
          },
          {
            truePositives: 0,
            falsePositives: 0,
            trueNegatives: 0,
            falseNegatives: 0
          }
        );

        const totalPredictions = predictionsWithOutcomes.length;
        const correctPredictions = metrics.truePositives + metrics.trueNegatives;
        const accuracy = (correctPredictions / totalPredictions) * 100;

        set({
          metrics: {
            ...metrics,
            accuracy,
            totalPredictions,
            lastUpdated: new Date().toISOString()
          }
        });
      },

      clearHistory: () => {
        set({
          predictions: [],
          metrics: INITIAL_METRICS
        });
      }
    }),
    {
      name: 'prediction-storage',
      version: 1,
      partialize: (state) => ({
        predictions: state.predictions.slice(0, 100), // Only persist last 100 predictions
        metrics: state.metrics
      })
    }
  )
);

// Selector hooks for specific metrics
export const usePredictionMetrics = () => usePredictionStore((state) => state.metrics);
export const usePredictionHistory = () => usePredictionStore((state) => state.predictions);
export const usePredictionActions = () => {
  const store = usePredictionStore();
  return {
    addPrediction: store.addPrediction,
    updateOutcome: store.updateOutcome,
    clearHistory: store.clearHistory
  };
};