interface Metric {
  label: string;
  value: string;
  change: number;
  unit: string;
}

const metrics: Metric[] = [
  {
    label: 'Water Savings',
    value: '2,450',
    change: 15,
    unit: 'L',
  },
  {
    label: 'Energy Usage',
    value: '320',
    change: -8,
    unit: 'kWh',
  },
  {
    label: 'Cost Savings',
    value: '180',
    change: 12,
    unit: 'USD',
  },
];

export function ResourceMetrics() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Resource Metrics</h2>
      
      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-sm text-gray-500">{metric.label}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {metric.value} {metric.unit}
              </p>
              <span className={`ml-2 text-sm ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}