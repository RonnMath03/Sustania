import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const mockData = [
  { name: 'Correct', value: 85 },
  { name: 'Incorrect', value: 15 },
];

const COLORS = ['#22c55e', '#ef4444'];

export function PredictionAccuracy() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">ML Prediction Accuracy</h2>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {mockData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-center">
        <p className="text-2xl font-bold text-green-600">85%</p>
        <p className="text-sm text-gray-500">Overall Accuracy</p>
      </div>
    </div>
  );
}