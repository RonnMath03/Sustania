import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WaterUsageAnalytics } from './water-usage-analytics';
import { CropPerformance } from './crop-performance';
import { CostAnalysis } from './cost-analysis';
import { Recommendations } from './recommendations';
import { BarChart3, Sprout, DollarSign, Lightbulb } from 'lucide-react';

export function AnalyticsView() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Insights</h2>
      </div>

      <Tabs defaultValue="water" className="space-y-4">
        <TabsList>
          <TabsTrigger value="water">Water Usage</TabsTrigger>
          <TabsTrigger value="crops">Crop Performance</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="insights">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="water" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,500 L</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  +5% improvement
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8/10</div>
                <p className="text-xs text-muted-foreground">
                  2 zones inactive
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>
          </div>
          <WaterUsageAnalytics />
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <CropPerformance />
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <CostAnalysis />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Recommendations />
        </TabsContent>
      </Tabs>
    </div>
  );
}