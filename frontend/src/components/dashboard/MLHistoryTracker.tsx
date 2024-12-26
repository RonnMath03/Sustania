import React from 'react';
import { format, subDays } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, Target, AlertTriangle } from 'lucide-react';
import { usePersistentStore } from '../../store/persistentStore';

export function MLHistoryTracker() {
  const { predictionHistory } = usePersistentStore();

  const accuracyMetrics = {
    total: predictionHistory.length,
    accurate: predictionHistory.filter(p => p.prediction.probability > 0.8).length,
    falsePositives: predictionHistory.filter(p => 
      p.prediction.need_irrigation && p.prediction.probability < 0.7
    ).length
  };

  const accuracyRate = (accuracyMetrics.accurate / accuracyMetrics.total) * 100 || 0;

  const chartData = predictionHistory
    .slice(-30)
    .map(entry => ({
      timestamp: entry.timestamp,
      probability: entry.prediction.probability * 100,
      needIrrigation: entry.prediction.need_irrigation
    }))
    .reverse();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">ML Prediction History</h2>
        <span className="text-sm text-gray-500">Last 30 predictions</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">Total Predictions</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {accuracyMetrics.total}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Accuracy Rate</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {accuracyRate.toFixed(1)}%
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">False Positives</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {accuracyMetrics.falsePositives}
          </div>
        </div>
      </div>

      {/* Prediction History Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="probability"
              name="Confidence Level"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Predictions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recommendation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {predictionHistory.slice(0, 5).map((entry, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(entry.timestamp), 'PPp')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    entry.prediction.need_irrigation
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {entry.prediction.need_irrigation ? 'Irrigate' : 'Skip'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {(entry.prediction.probability * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}