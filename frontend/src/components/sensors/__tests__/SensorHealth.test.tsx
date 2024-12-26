import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SensorHealth } from '../SensorHealth';

describe('SensorHealth', () => {
  const mockHealthData = {
    status: 'healthy' as const,
    lastUpdate: new Date().toISOString(),
    batteryLevel: 85,
  };

  it('renders health status correctly', () => {
    render(<SensorHealth health={mockHealthData} />);
    expect(screen.getByText('Healthy')).toBeInTheDocument();
  });

  it('displays battery level with correct color', () => {
    render(<SensorHealth health={mockHealthData} />);
    const batteryLevel = screen.getByText('85%');
    expect(batteryLevel).toHaveClass('text-green-600');
  });

  it('shows warning status with correct styling', () => {
    const warningHealth = {
      ...mockHealthData,
      status: 'warning' as const,
      batteryLevel: 30,
    };

    render(<SensorHealth health={warningHealth} />);
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('shows error status with correct styling', () => {
    const errorHealth = {
      ...mockHealthData,
      status: 'error' as const,
      batteryLevel: 10,
    };

    render(<SensorHealth health={errorHealth} />);
    expect(screen.getByText('Error')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('formats last update timestamp correctly', () => {
    const date = new Date('2023-12-25T12:00:00Z');
    const health = {
      ...mockHealthData,
      lastUpdate: date.toISOString(),
    };

    render(<SensorHealth health={health} />);
    expect(screen.getByText(/12\/25\/2023/)).toBeInTheDocument();
  });
});