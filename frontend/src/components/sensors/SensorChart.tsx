import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  timestamp: string;
  moisture: number;
  temperature: number;
}

interface SensorChartProps {
  data: DataPoint[];
}

export function SensorChart({ data }: SensorChartProps) {
  const formattedData = data.map(point => ({
    ...point,
    time: format(new Date(point.timestamp), 'HH:mm'),
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="moisture" domain={[400, 900]} />
          <YAxis yAxisId="temperature" orientation="right" domain={[0, 40]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="moisture"
            type="monotone"
            dataKey="moisture"
            stroke="#2563eb"
            name="Moisture"
          />
          <Line
            yAxisId="temperature"
            type="monotone"
            dataKey="temperature"
            stroke="#dc2626"
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}