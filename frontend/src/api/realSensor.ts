import axios from 'axios';
import { SensorData } from '../types';

const sensorApiClient = axios.create({
  baseURL: 'http://localhost:8001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const realSensorApi = {
  async getCurrentReading(): Promise<SensorData> {
    try {
      const response = await sensorApiClient.get<SensorData>('/getCurrentReading');
      
      if (!response.data) {
        throw new Error('No data received from sensor');
      }
      
      // Ensure the response matches the expected SensorData type
      const { moisture, temperature } = response.data;
      
      // Validate the data
      if (
        typeof moisture !== 'number' || 
        typeof temperature !== 'number' ||
        moisture < 400 || 
        moisture > 900 || 
        temperature < 0 || 
        temperature > 40
      ) {
        throw new Error('Invalid sensor data received');
      }
      
      return response.data;
    } catch (error) {
      // Format error to match what the hook expects
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch sensor data');
    }
  }
};