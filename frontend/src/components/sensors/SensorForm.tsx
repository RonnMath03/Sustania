import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useSensorPrediction } from '../../hooks/useSensorPrediction';
import { SensorData } from '../../types';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function SensorForm() {
  const [selectedMode, setSelectedMode] = useState<'sensor' | 'manual'>('sensor');
  const [formData, setFormData] = useState<SensorData>({
    moisture: 600,
    temperature: 25
  });

  const { getPrediction, isLoading } = useSensorPrediction();

  const handleSensorRead = async () => {
    try {
      const mockSensorData: SensorData = {
        moisture: Math.floor(Math.random() * (900 - 400) + 400),
        temperature: Math.floor(Math.random() * 40)
      };
      
      setFormData(mockSensorData);
      toast.success('Sensor data updated');
    } catch (error) {
      toast.error('Failed to read sensor data');
    }
  };

  const handleGetPrediction = async () => {
    try {
      await getPrediction(formData);
      toast.success('Prediction received successfully');
    } catch (error) {
      toast.error('Failed to get prediction');
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.moisture < 400 || formData.moisture > 900) {
      toast.error('Moisture must be between 400 and 900');
      return;
    }
    
    if (formData.temperature < 0 || formData.temperature > 40) {
      toast.error('Temperature must be between 0 and 40°C');
      return;
    }

    handleGetPrediction();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name === 'mode') {
      setSelectedMode(e.target.value as 'sensor' | 'manual');
      return;
    }

    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <div className="space-y-4">
      <select
        name="mode"
        value={selectedMode}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 border-gray-300"
      >
        <option value="sensor">Sensor Reading</option>
        <option value="manual">Manual Entry</option>
      </select>

      {selectedMode === 'sensor' ? (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Current Sensor Values:</span>
              <Button
                variant="outline"
                onClick={handleSensorRead}
                disabled={isLoading}
                className="!p-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Moisture</div>
                <div className="text-lg font-semibold">{formData.moisture}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="text-lg font-semibold">{formData.temperature}°C</div>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleGetPrediction}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Getting Prediction...' : 'Get Prediction'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <Input
            label="Soil Moisture (400-900)"
            type="number"
            name="moisture"
            value={formData.moisture}
            onChange={handleChange}
            min={400}
            max={900}
            required
            error={formData.moisture < 400 || formData.moisture > 900 ? 'Must be between 400 and 900' : undefined}
          />
          
          <Input
            label="Temperature (0-40°C)"
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            min={0}
            max={40}
            required
            error={formData.temperature < 0 || formData.temperature > 40 ? 'Must be between 0 and 40°C' : undefined}
          />

          <Button 
            type="submit" 
            disabled={isLoading || 
              formData.moisture < 400 || 
              formData.moisture > 900 || 
              formData.temperature < 0 || 
              formData.temperature > 40}
            className="w-full"
          >
            {isLoading ? 'Getting Prediction...' : 'Get Prediction'}
          </Button>
        </form>
      )}
    </div>
  );
}