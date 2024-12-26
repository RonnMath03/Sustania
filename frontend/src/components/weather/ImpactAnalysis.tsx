import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Droplets, Leaf, ThermometerSun } from 'lucide-react';

interface ImpactMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const impactMetrics: ImpactMetric[] = [
  {
    label: 'Water Efficiency',
    value: 85,
    change: 12,
    icon: <Droplets className="w-5 h-5" />,
    color: 'text-blue-600'
  },
  {
    label: 'Growth Rate',
    value: 92,
    change: 8,
    icon: <Leaf className="w-5 h-5" />,
    color: 'text-green-600'
  },
  {
    label: 'Temperature Management',
    value: 78,
    change: -3,
    icon: <ThermometerSun className="w-5 h-5" />,
    color: 'text-orange-600'
  }
];

const monthlyData = [
  { month: 'Jan', manual: 65, ml: 82 },
  { month: 'Feb', manual: 68, ml: 84 },
  { month: 'Mar', manual: 70, ml: 86 },
  { month: 'Apr', manual: 72, ml: 88 },
  { month: 'May', manual: 69, ml: 85 },
  { month: 'Jun', manual: 67, ml: 83 }
];

export function ImpactAnalysis() {
  return (
    <div className="space-y-6">
      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {impactMetrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={metric.color}>{metric.icon}</div>
              <h3 className="font-medium text-gray-900">{metric.label}</h3>
            </div>
            
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold text-gray-900">
                {metric.value}%
              </span>
              <span className={`ml-2 text-sm ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ML vs Manual Comparison */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-6">ML vs Manual Irrigation Efficiency</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="manual" name="Manual Control" fill="#94a3b8" />
              <Bar dataKey="ml" name="ML Optimized" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Findings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Water Conservation</h4>
            <p className="text-green-700">
              ML-driven irrigation has resulted in a 23% reduction in water usage while maintaining optimal soil moisture levels.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Prediction Accuracy</h4>
            <p className="text-blue-700">
              The ML model maintains an average prediction accuracy of 73.8% for irrigation needs, with continuous improvement through learning.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Weather Adaptation</h4>
            <p className="text-yellow-700">
              System successfully adapts irrigation schedules based on weather forecasts, preventing over-watering during rain periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}