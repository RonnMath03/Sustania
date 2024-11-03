import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { crop: 'Wheat', yield: 85, target: 90, industry: 82 },
  { crop: 'Corn', yield: 92, target: 88, industry: 85 },
  { crop: 'Soybeans', yield: 78, target: 85, industry: 80 },
  { crop: 'Cotton', yield: 88, target: 92, industry: 86 },
];

export function CropPerformance() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Crop Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="crop" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="yield" 
                  fill="hsl(var(--primary))" 
                  name="Current Yield"
                />
                <Bar 
                  dataKey="target" 
                  fill="hsl(var(--muted-foreground))" 
                  name="Target"
                />
                <Bar 
                  dataKey="industry" 
                  fill="hsl(var(--accent))" 
                  name="Industry Avg"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Soil Quality', score: 85 },
              { name: 'Water Management', score: 92 },
              { name: 'Pest Control', score: 78 },
              { name: 'Nutrient Levels', score: 88 },
            ].map((factor) => (
              <div key={factor.name} className="flex items-center justify-between">
                <span className="font-medium">{factor.name}</span>
                <span className={`${
                  factor.score >= 90 
                    ? 'text-green-500' 
                    : factor.score >= 75 
                    ? 'text-yellow-500' 
                    : 'text-red-500'
                }`}>
                  {factor.score}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yield Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { crop: 'Wheat', prediction: '+5%', confidence: 'High' },
              { crop: 'Corn', prediction: '+8%', confidence: 'Medium' },
              { crop: 'Soybeans', prediction: '+3%', confidence: 'High' },
              { crop: 'Cotton', prediction: '+6%', confidence: 'Low' },
            ].map((pred) => (
              <div key={pred.crop} className="flex items-center justify-between">
                <span className="font-medium">{pred.crop}</span>
                <div className="text-right">
                  <span className="text-green-500 block">{pred.prediction}</span>
                  <span className="text-sm text-muted-foreground">
                    {pred.confidence} confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}