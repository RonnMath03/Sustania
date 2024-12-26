import React from 'react';
import { MLPerformanceMetrics } from './MLPerformanceMetrics';
import { DataExport } from './DataExport';
import { usePersistence } from '../../hooks/usePersistence';

export function AnalyticsDashboard() {
  // Initialize persistence hook
  usePersistence();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
        <div className="flex gap-4">
          <select className="text-sm border rounded-md px-3 py-1.5">
            <option value="all">All Zones</option>
            <option value="zone1">Zone 1</option>
            <option value="zone2">Zone 2</option>
            <option value="zone3">Zone 3</option>
          </select>
          <select className="text-sm border rounded-md px-3 py-1.5">
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <MLPerformanceMetrics />
        <DataExport />
      </div>
    </div>
  );
}