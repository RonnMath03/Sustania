import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RealtimeSensorDisplay } from '../RealtimeSensorDisplay';
import { useRealtimeSensor } from '../../../hooks/useRealtimeSensor';

// Mock the hook
vi.mock('../../../hooks/useRealtimeSensor');

describe('RealtimeSensorDisplay', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state correctly', () => {
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      lastUpdate: null,
      isManualFetching: false,
      manualRefresh: vi.fn(),
    });

    render(<RealtimeSensorDisplay />);
    expect(screen.getByText('Real-time Sensor Data')).toBeInTheDocument();
    expect(screen.getByText('--')).toBeInTheDocument();
  });

  it('displays sensor data correctly', () => {
    const mockData = {
      moisture: 650,
      temperature: 25,
    };

    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      lastUpdate: new Date().toISOString(),
      isManualFetching: false,
      manualRefresh: vi.fn(),
    });

    render(<RealtimeSensorDisplay />);
    expect(screen.getByText('650')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });

  it('handles error state correctly', () => {
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch sensor data'),
      lastUpdate: null,
      isManualFetching: false,
      manualRefresh: vi.fn(),
    });

    render(<RealtimeSensorDisplay />);
    expect(screen.getByText(/Failed to fetch sensor data/i)).toBeInTheDocument();
  });

  it('triggers manual refresh when button is clicked', async () => {
    const manualRefresh = vi.fn();
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      lastUpdate: null,
      isManualFetching: false,
      manualRefresh,
    });

    render(<RealtimeSensorDisplay />);
    const refreshButton = screen.getByRole('button');
    fireEvent.click(refreshButton);

    expect(manualRefresh).toHaveBeenCalledTimes(1);
  });

  it('shows loading state during manual refresh', () => {
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      lastUpdate: null,
      isManualFetching: true,
      manualRefresh: vi.fn(),
    });

    render(<RealtimeSensorDisplay />);
    const refreshIcon = screen.getByRole('button').querySelector('svg');
    expect(refreshIcon).toHaveClass('animate-spin');
  });
});