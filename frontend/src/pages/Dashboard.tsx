import { useEffect } from 'react';
import { SensorDisplay } from '../components/sensors/SensorDisplay';
import { MLMetrics } from '../components/dashboard/MLMetrics';
import { useSensorStore } from '../store/sensorStore';

export function Dashboard() {
  const { setHealth } = useSensorStore();

  useEffect(() => {
    const checkHealth = () => {
      setHealth({
        status: 'healthy',
        lastUpdate: new Date().toISOString(),
        batteryLevel: 85
      });
    };

    checkHealth();
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, [setHealth]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <SensorDisplay />
      <MLMetrics />
    </div>
  );
}