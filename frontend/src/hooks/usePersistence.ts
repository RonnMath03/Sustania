import { useEffect } from 'react';
import { usePersistentStore } from '../store/persistentStore';
import { useRealtimeSensor } from './useRealtimeSensor';
import { useSensorPrediction } from './useSensorPrediction';
import { useSensorStore } from '../store/sensorStore';

export function usePersistence() {
  const { data: sensorData } = useRealtimeSensor();
  const { prediction } = useSensorPrediction();
  const sensorHealth = useSensorStore((state) => state.health);
  
  const {
    addSensorData,
    addPrediction,
    updateSensorHealth,
    updateLastSync
  } = usePersistentStore();

  // Persist sensor data when it changes
  useEffect(() => {
    if (sensorData) {
      addSensorData(sensorData);
      updateLastSync();
    }
  }, [sensorData, addSensorData, updateLastSync]);

  // Persist predictions when they change
  useEffect(() => {
    if (prediction) {
      addPrediction(prediction);
      updateLastSync();
    }
  }, [prediction, addPrediction, updateLastSync]);

  // Persist sensor health when it changes
  useEffect(() => {
    if (sensorHealth) {
      updateSensorHealth(sensorHealth);
      updateLastSync();
    }
  }, [sensorHealth, updateSensorHealth, updateLastSync]);
}