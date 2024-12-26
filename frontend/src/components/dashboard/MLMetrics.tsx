import React from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain } from 'lucide-react';
import { usePredictionStore } from '../../store/predictionStore';

export function MLMetrics() {
  const { predictions } = usePredictionStore();

  const chartData = predictions.slice(0, 20).map(entry => ({
    timestamp: entry.timestamp,
    confidence: Math.round(entry.prediction.confidence * 100),
    needIrrigation: entry.prediction.need_irrigation
  })).reverse();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-medium text-gray-900">ML Model Predictions</h2>
      </div>

      {/* Confidence Level Chart */}
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
              formatter={(value: number) => [`${value}%`, 'Confidence']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="confidence"
              name="Confidence Level"
              stroke="#6366f1"
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
            {predictions.slice(0, 5).map((entry, index) => (
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
                  {Math.round(entry.prediction.confidence * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-medium text-gray-900">Recent Performance</h3>
        </div>
        <div className="text-sm text-gray-600">
          Average Confidence: {(predictions.slice(0, 20).reduce((acc, curr) => 
            acc + curr.prediction.confidence * 100, 0) / 
            Math.min(predictions.length, 20)).toFixed(1)}%
        </div>
      </div>
    </div>
  );
}