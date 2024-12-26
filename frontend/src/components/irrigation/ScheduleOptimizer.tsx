import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Droplets, AlertTriangle } from 'lucide-react';
import { Button } from '../Button';
import { useWeather } from '../../hooks/useWeather';
import { useSensorData } from '../../hooks/useSensorData';
import toast from 'react-hot-toast';

interface OptimizedSchedule {
  zoneId: string;
  startTime: string;
  duration: number;
  waterAmount: number;
  confidence: number;
  factors: {
    weather: number;
    moisture: number;
    historical: number;
  };
}

export function ScheduleOptimizer() {
  const [optimizedSchedules, setOptimizedSchedules] = useState<OptimizedSchedule[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { data: weather } = useWeather();
  const { data: sensorData } = useSensorData();

  const optimizeSchedules = async () => {
    setIsOptimizing(true);
    try {
      // Simulate API call for optimization
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockOptimizedSchedules: OptimizedSchedule[] = [
        {
          zoneId: 'zone1',
          startTime: '06:00',
          duration: 25,
          waterAmount: 150,
          confidence: 0.89,
          factors: {
            weather: 0.8,
            moisture: 0.9,
            historical: 0.85
          }
        },
        {
          zoneId: 'zone2',
          startTime: '18:30',
          duration: 20,
          waterAmount: 120,
          confidence: 0.92,
          factors: {
            weather: 0.95,
            moisture: 0.88,
            historical: 0.92
          }
        }
      ];

      setOptimizedSchedules(mockOptimizedSchedules);
      toast.success('Schedules optimized successfully');
    } catch (error) {
      toast.error('Failed to optimize schedules');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Schedule Optimization</h2>
          <p className="text-sm text-gray-500">
            ML-powered schedule optimization based on weather, soil conditions, and historical data
          </p>
        </div>
        <Button
          onClick={optimizeSchedules}
          disabled={isOptimizing}
        >
          {isOptimizing ? 'Optimizing...' : 'Optimize Schedules'}
        </Button>
      </div>

      {optimizedSchedules.length > 0 && (
        <div className="space-y-4">
          {optimizedSchedules.map((schedule) => (
            <div
              key={schedule.zoneId}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">
                    Zone {schedule.zoneId}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {schedule.startTime} ({schedule.duration} min)
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="w-4 h-4" />
                      {schedule.waterAmount}L
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Weather Impact:</span>
                      <span className="ml-1 font-medium">
                        {Math.round(schedule.factors.weather * 100)}%
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Soil Moisture:</span>
                      <span className="ml-1 font-medium">
                        {Math.round(schedule.factors.moisture * 100)}%
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Historical Data:</span>
                      <span className="ml-1 font-medium">
                        {Math.round(schedule.factors.historical * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    Confidence
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(schedule.confidence * 100)}%
                  </div>
                </div>
              </div>

              {schedule.confidence < 0.8 && (
                <div className="mt-4 flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Low confidence prediction. Consider manual review.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Optimization Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Weather Conditions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Forecast: {weather?.current.conditions || 'N/A'}</li>
            <li>• Temperature: {weather?.current.temp || 'N/A'}°C</li>
            <li>• Humidity: {weather?.current.humidity || 'N/A'}%</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">Soil Conditions</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Moisture: {sensorData?.moisture || 'N/A'}</li>
            <li>• Temperature: {sensorData?.temperature || 'N/A'}°C</li>
            <li>• Optimal Range: 600-800</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-medium text-purple-900 mb-2">Historical Patterns</h3>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Average Duration: 25 min</li>
            <li>• Water Usage: 135L/session</li>
            <li>• Success Rate: 92%</li>
          </ul>
        </div>
      </div>
    </div>
  );
}