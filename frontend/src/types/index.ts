export interface SensorData {
  moisture: number;
  temperature: number;
}

export interface PredictionResponse {
  need_irrigation: boolean;
  confidence: number;
  timestamp: string;
}

export interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    conditions: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    conditions: string;
  }>;
}

export interface SensorHealth {
  status: 'healthy' | 'warning' | 'error';
  lastUpdate: string;
  batteryLevel: number;
}

export interface HistoryEntry {
  timestamp: string;
  moisture: number;
  temperature: number;
  prediction: {
    need_irrigation: boolean;
    confidence: number;
  };
}