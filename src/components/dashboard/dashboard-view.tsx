import { StatsCards } from './stats-cards';
import { WeatherCard } from './weather-card';
import { IrrigationOverview } from './irrigation-overview';
import { WaterUsageChart } from './water-usage-chart';
import { SystemAlerts } from './system-alerts';

export function DashboardView() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatsCards />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <WeatherCard />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <IrrigationOverview />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <WaterUsageChart />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SystemAlerts />
        </div>
      </div>
    </div>
  );
}