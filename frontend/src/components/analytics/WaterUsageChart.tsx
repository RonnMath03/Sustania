import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

const generateMockData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: subDays(new Date(), i).toISOString(),
    usage: Math.round(Math.random() * 1000 + 500),
    predicted: Math.round(Math.random() * 1000 + 500),
  })).reverse();
};

export function WaterUsageChart() {
  const data = generateMockData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm col-span-2">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Water Usage Trends</h2>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'PPP')}
              formatter={(value: number) => [`${value}L`, '']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#2563eb"
              name="Actual Usage"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#7c3aed"
              name="Predicted Usage"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}