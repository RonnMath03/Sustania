import { apiClient } from './client';
import { SensorData, PredictionResponse } from '../types';

export const sensorsApi = {
  async getPrediction(data: SensorData): Promise<PredictionResponse> {
    try {
      const response = await apiClient.post('/predict', {
        moisture: data.moisture,
        temperature: data.temperature
      });

      if (!response.data) {
        throw new Error('Failed to get prediction from API');
      }

      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to get prediction from API');
    }
  },

  async getHealth() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get health status');
    }
  },

  async getModelInfo() {
    try {
      const response = await apiClient.get('/model-info');
      return response.data;
    } catch (error) {
      throw new Error('Failed to get model information');
    }
  }
};