import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

interface HistoricalData {
  timestamp: string;
  temperature: number;
  moisture: number;
  irrigation: boolean;
  confidence: number;
}

export function WeatherHistory() {
  const [data, setData] = useState<HistoricalData[]>([]);

  useEffect(() => {
    // Generate mock historical data
    const mockData: HistoricalData[] = Array.from({ length: 14 }, (_, i) => ({
      timestamp: subDays(new Date(), 13 - i).toISOString(),
      temperature: Math.round(Math.random() * 15 + 20),
      moisture: Math.round(Math.random() * 300 + 500),
      irrigation: Math.random() > 0.5,
      confidence: Math.random() * 0.3 + 0.7
    }));

    setData(mockData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Historical Trends</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(date) => format(new Date(date), 'MMM d')}
              />
              <YAxis yAxisId="temp" orientation="left" domain={[0, 40]} />
              <YAxis yAxisId="moisture" orientation="right" domain={[400, 900]} />
              <Tooltip
                labelFormatter={(date) => format(new Date(date), 'PPP')}
                formatter={(value: number, name: string) => {
                  switch (name) {
                    case 'Temperature':
                      return [`${value}°C`, name];
                    case 'Moisture':
                      return [value, name];
                    default:
                      return [value, name];
                  }
                }}
              />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="#ef4444"
                dot={false}
              />
              <Line
                yAxisId="moisture"
                type="monotone"
                dataKey="moisture"
                name="Moisture"
                stroke="#3b82f6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Irrigation History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moisture
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Irrigation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((entry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(entry.timestamp), 'PP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.temperature}°C
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.moisture}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      entry.irrigation
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {entry.irrigation ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(entry.confidence * 100)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}