import React from 'react';
import { format } from 'date-fns';
import { Brain, Target, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { usePredictionAnalytics } from '../../hooks/usePredictionAnalytics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PredictionMetrics() {
  const { metrics, trendData, recentPredictions } = usePredictionAnalytics();

  const getTrendIcon = () => {
    switch (trendData.accuracyTrend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const chartData = recentPredictions.map((pred) => ({
    timestamp: pred.timestamp,
    confidence: pred.prediction.probability * 100,
    correct: pred.actualOutcome === pred.prediction.need_irrigation
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">ML Model Performance</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {getTrendIcon()}
          <span>Accuracy is {trendData.accuracyTrend}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">Model Accuracy</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.accuracy.toFixed(1)}%
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Total Predictions</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.totalPredictions}
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">False Positives</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.falsePositives}
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d')}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip
              labelFormatter={(timestamp) => format(new Date(timestamp), 'PPp')}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Confidence']}
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={(props) => {
                const isCorrect = chartData[props.index]?.correct;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={4}
                    fill={isCorrect ? '#22c55e' : '#ef4444'}
                    stroke="none"
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Prediction Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">True Positives:</span>
              <span className="font-medium">{metrics.truePositives}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">True Negatives:</span>
              <span className="font-medium">{metrics.trueNegatives}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">False Positives:</span>
              <span className="font-medium">{metrics.falsePositives}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">False Negatives:</span>
              <span className="font-medium">{metrics.falseNegatives}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Average Confidence:</span>
              <span className="font-medium">
                {(trendData.confidenceTrend.reduce((a, b) => a + b, 0) / 
                  trendData.confidenceTrend.length).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Trend:</span>
              <span className="font-medium capitalize">{trendData.accuracyTrend}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}