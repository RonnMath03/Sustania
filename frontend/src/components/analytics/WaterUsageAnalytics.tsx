import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import { Droplets, TrendingUp, TrendingDown } from 'lucide-react';

interface WaterUsageData {
  date: string;
  actual: number;
  predicted: number;
  savings: number;
}

const generateMockData = (): WaterUsageData[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: subDays(new Date(), 29 - i).toISOString(),
    actual: Math.round(Math.random() * 300 + 700),
    predicted: Math.round(Math.random() * 400 + 800),
    savings: Math.round(Math.random() * 100 + 50),
  }));
};

export function WaterUsageAnalytics() {
  const data = generateMockData();
  const totalSavings = data.reduce((acc, curr) => acc + curr.savings, 0);
  const averageUsage = Math.round(data.reduce((acc, curr) => acc + curr.actual, 0) / data.length);
  const trend = data[data.length - 1].actual < data[0].actual ? 'decrease' : 'increase';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Water Usage Analytics</h2>
        <div className="flex gap-2">
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Droplets className="w-5 h-5" />
            <span className="text-sm font-medium">Total Water Savings</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {totalSavings}L
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-medium">Average Daily Usage</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {averageUsage}L
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
            {trend === 'decrease' ? (
              <TrendingDown className="w-5 h-5" />
            ) : (
              <TrendingUp className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">Usage Trend</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {trend === 'decrease' ? 'Decreasing' : 'Increasing'}
          </div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'PPP')}
              formatter={(value: number, name: string) => [
                `${value}L`,
                name === 'actual' ? 'Actual Usage' : 'Predicted Usage'
              ]}
            />
            <Area
              type="monotone"
              dataKey="predicted"
              stroke="#94a3b8"
              fill="#94a3b8"
              fillOpacity={0.3}
              name="Predicted Usage"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              name="Actual Usage"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Key Insights
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Water usage reduced by 15% compared to last month</li>
            <li>• Peak usage occurs during morning hours (6-8 AM)</li>
            <li>• ML predictions helped save 2,450L of water</li>
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Recommendations
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Consider adjusting morning irrigation schedule</li>
            <li>• Monitor Zone 2 for potential leaks</li>
            <li>• Update soil moisture thresholds for better efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  );
}