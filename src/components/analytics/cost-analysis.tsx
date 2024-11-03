import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const costData = [
  { name: 'Water', value: 35 },
  { name: 'Labor', value: 25 },
  { name: 'Equipment', value: 20 },
  { name: 'Maintenance', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#8b5cf6', '#64748b'];

export function CostAnalysis() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Cost Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Monthly Cost</span>
              <span className="font-bold">$12,450</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cost per Hectare</span>
              <span className="font-bold">$245</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Cost per Liter</span>
              <span className="font-bold">$0.05</span>
            </div>
            <div className="flex justify-between items-center text-green-500">
              <span>Potential Savings</span>
              <span className="font-bold">$2,300</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Efficiency Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Resource Utilization</span>
              <span className="font-bold text-green-500">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Labor Efficiency</span>
              <span className="font-bold text-yellow-500">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Equipment ROI</span>
              <span className="font-bold text-green-500">125%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Maintenance Index</span>
              <span className="font-bold text-blue-500">88%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}