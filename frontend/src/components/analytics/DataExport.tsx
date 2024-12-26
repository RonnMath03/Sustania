import React, { useState } from 'react';
import { Button } from '../Button';
import { usePersistentStore } from '../../store/persistentStore';
import { Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function DataExport() {
  const [isExporting, setIsExporting] = useState(false);
  const { sensorHistory, predictionHistory, clearHistory, lastSync } = usePersistentStore();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      const exportData = {
        sensorHistory,
        predictionHistory,
        exportDate: new Date().toISOString(),
        lastSync
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sustania-data-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all historical data? This action cannot be undone.')) {
      clearHistory();
      toast.success('Historical data cleared');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Data Management</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Export Data</h3>
            <p className="text-sm text-gray-500">
              Download sensor and prediction history
            </p>
          </div>
          <Button
            onClick={handleExport}
            disabled={isExporting || !sensorHistory.length}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export'}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Clear History</h3>
            <p className="text-sm text-gray-500">
              Remove all historical data
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleClearHistory}
            disabled={!sensorHistory.length}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {lastSync && (
          <p className="text-xs text-gray-500">
            Last synchronized: {new Date(lastSync).toLocaleString()}
          </p>
        )}

        <div className="text-sm text-gray-500">
          <p>Stored entries:</p>
          <ul className="list-disc list-inside">
            <li>Sensor readings: {sensorHistory.length}</li>
            <li>Predictions: {predictionHistory.length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}