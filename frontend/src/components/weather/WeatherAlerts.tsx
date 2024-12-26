import { useState, useEffect } from 'react';
import { AlertTriangle, Droplets, ThermometerSun } from 'lucide-react';
import toast from 'react-hot-toast';

interface WeatherAlert {
  id: string;
  type: 'warning' | 'critical' | 'irrigation';
  message: string;
  timestamp: string;
  confidence?: number;
}

export function WeatherAlerts() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);

  useEffect(() => {
    // Mock weather and irrigation alerts
    const mockAlerts: WeatherAlert[] = [
      {
        id: '1',
        type: 'irrigation',
        message: 'Irrigation recommended based on current conditions',
        timestamp: new Date().toISOString(),
        confidence: 0.738
      },
      {
        id: '2',
        type: 'warning',
        message: 'High temperature expected tomorrow',
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        type: 'critical',
        message: 'Severe storm warning',
        timestamp: new Date().toISOString()
      }
    ];

    setAlerts(mockAlerts);

    // Show toast for critical alerts
    mockAlerts
      .filter(alert => alert.type === 'critical')
      .forEach(alert => {
        toast.error(alert.message, { duration: 5000 });
      });
  }, []);

  const getAlertStyles = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'irrigation':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'critical':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  const getAlertIcon = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'irrigation':
        return <Droplets className="text-green-600" />;
      case 'critical':
        return <AlertTriangle className="text-red-600" />;
      case 'warning':
        return <ThermometerSun className="text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg ${getAlertStyles(alert.type)}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {alert.message}
              </p>
              <div className="mt-1 text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleString()}
                {alert.confidence && (
                  <span className="ml-2 text-green-600">
                    Confidence: {Math.round(alert.confidence * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}