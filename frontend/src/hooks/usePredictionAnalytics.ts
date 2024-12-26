import { useState, useEffect } from 'react';
import { usePredictionStore } from '../store/predictionStore';

export function usePredictionAnalytics() {
  const predictions = usePredictionStore((state) => state.predictions);
  const metrics = usePredictionStore((state) => state.metrics);
  const [trendData, setTrendData] = useState<{
    accuracyTrend: 'improving' | 'declining' | 'stable';
    confidenceTrend: number[];
  }>({
    accuracyTrend: 'stable',
    confidenceTrend: []
  });

  useEffect(() => {
    // Calculate trends based on last 20 predictions
    const recentPredictions = predictions.slice(0, 20);
    const olderPredictions = predictions.slice(20, 40);

    if (recentPredictions.length === 0) return;

    // Calculate average confidence for recent predictions
    const recentConfidence = recentPredictions.map(
      (p) => p.prediction.probability * 100
    );

    // Calculate accuracy trend
    const recentAccuracy = recentPredictions.filter(
      (p) => p.actualOutcome === p.prediction.need_irrigation
    ).length / recentPredictions.length;

    const olderAccuracy = olderPredictions.filter(
      (p) => p.actualOutcome === p.prediction.need_irrigation
    ).length / olderPredictions.length;

    let accuracyTrend: 'improving' | 'declining' | 'stable';
    if (recentAccuracy > olderAccuracy + 0.05) {
      accuracyTrend = 'improving';
    } else if (recentAccuracy < olderAccuracy - 0.05) {
      accuracyTrend = 'declining';
    } else {
      accuracyTrend = 'stable';
    }

    setTrendData({
      accuracyTrend,
      confidenceTrend: recentConfidence
    });
  }, [predictions]);

  return {
    metrics,
    trendData,
    recentPredictions: predictions.slice(0, 20),
    totalPredictions: predictions.length
  };
}