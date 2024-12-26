import { useState, useEffect } from 'react';
import { SensorData } from '../types';
//import { mockSensorApi as sensorApi } from '../api/mockSensor';
import { realSensorApi as sensorApi } from '../api/realSensor';
import toast from 'react-hot-toast';

const POLLING_INTERVAL = 10000; // 10 seconds

export function useSensorData() {
  const [data, setData] = useState<SensorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [isManualFetching, setIsManualFetching] = useState(false);

  const fetchData = async () => {
    try {
      const response = await sensorApi.getCurrentReading();
      setData(response);
      setLastUpdate(new Date().toISOString());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch sensor data'));
      toast.error('Failed to update sensor data');
    } finally {
      setIsLoading(false);
      setIsManualFetching(false);
    }
  };

  const manualRefresh = async () => {
    setIsManualFetching(true);
    await fetchData();
  };

  useEffect(() => {
    let mounted = true;
    let intervalId: NodeJS.Timeout;

    const initialize = async () => {
      if (mounted) {
        await fetchData();
      }
    };

    initialize();
    intervalId = setInterval(() => {
      if (mounted) {
        fetchData();
      }
    }, POLLING_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    lastUpdate,
    isManualFetching,
    manualRefresh
  };
}