import axios from 'axios';
import { SensorData, PredictionResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const api = {
  async getHealth() {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  },

  async getModelInfo() {
    const response = await axios.get(`${API_BASE_URL}/model-info`);
    return response.data;
  },

  async predict(data: SensorData): Promise<PredictionResponse> {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    return response.data;
  }
};