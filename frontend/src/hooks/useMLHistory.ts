import { useState, useEffect } from 'react';
import { usePersistentStore } from '../store/persistentStore';

export function useMLHistory() {
  const { predictionHistory } = usePersistentStore();
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    totalPredictions: 0,
    falsePositives: 0,
    recentTrend: 'stable' as 'improving' | 'declining' | 'stable'
  });

  useEffect(() => {
    if (predictionHistory.length === 0) return;

    const total = predictionHistory.length;
    const accurate = predictionHistory.filter(p => p.prediction.probability > 0.8).length;
    const falsePositives = predictionHistory.filter(
      p => p.prediction.need_irrigation && p.prediction.probability < 0.7
    ).length;

    // Calculate trend based on last 10 predictions vs previous 10
    const recent = predictionHistory.slice(0, 10);
    const previous = predictionHistory.slice(10, 20);
    
    const recentAvg = recent.reduce((acc, p) => acc + p.prediction.probability, 0) / recent.length;
    const previousAvg = previous.reduce((acc, p) => acc + p.prediction.probability, 0) / previous.length;
    
    let trend: 'improving' | 'declining' | 'stable';
    if (recentAvg > previousAvg + 0.05) trend = 'improving';
    else if (recentAvg < previousAvg - 0.05) trend = 'declining';
    else trend = 'stable';

    setMetrics({
      accuracy: (accurate / total) * 100,
      totalPredictions: total,
      falsePositives,
      recentTrend: trend
    });
  }, [predictionHistory]);

  return metrics;
}