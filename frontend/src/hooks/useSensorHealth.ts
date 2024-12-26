import { useState, useEffect } from 'react';
import { SensorHealth } from '../types';
import { useSensorStore } from '../store/sensorStore';

export function useSensorHealth() {
  const [isLoading, setIsLoading] = useState(true);
  const setHealth = useSensorStore(state => state.setHealth);

  useEffect(() => {
    const checkHealth = () => {
      // Simulated health check
      const health: SensorHealth = {
        status: 'healthy',
        lastUpdate: new Date().toISOString(),
        batteryLevel: 85
      };
      
      setHealth(health);
      setIsLoading(false);
    };

    checkHealth();
    const interval = setInterval(checkHealth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [setHealth]);

  return {
    isLoading
  };
}