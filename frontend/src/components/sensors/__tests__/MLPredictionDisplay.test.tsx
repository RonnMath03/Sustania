import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MLPredictionDisplay } from '../MLPredictionDisplay';
import { useRealtimeSensor } from '../../../hooks/useRealtimeSensor';
import { useSensorPrediction } from '../../../hooks/useSensorPrediction';
import toast from 'react-hot-toast';

// Mock the hooks and toast
vi.mock('../../../hooks/useRealtimeSensor');
vi.mock('../../../hooks/useSensorPrediction');
vi.mock('react-hot-toast');

describe('MLPredictionDisplay', () => {
  const mockSensorData = {
    moisture: 650,
    temperature: 25
  };

  const mockPrediction = {
    need_irrigation: true,
    probability: 0.85,
    timestamp: new Date().toISOString()
  };

  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: mockSensorData,
      isLoading: false,
      error: null,
      lastUpdate: null,
      isManualFetching: false,
      manualRefresh: vi.fn()
    });

    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: null,
      isLoading: false,
      error: null,
      getPrediction: vi.fn()
    });
  });

  it('renders initial state correctly', () => {
    render(<MLPredictionDisplay />);
    expect(screen.getByText(/No prediction available/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get prediction/i })).toBeEnabled();
  });

  it('displays loading state when fetching prediction', () => {
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: null,
      isLoading: true,
      error: null,
      getPrediction: vi.fn()
    });

    render(<MLPredictionDisplay />);
    expect(screen.getByText('Getting Prediction...')).toBeInTheDocument();
  });

  it('shows prediction results when available', () => {
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: mockPrediction,
      isLoading: false,
      error: null,
      getPrediction: vi.fn()
    });

    render(<MLPredictionDisplay />);
    expect(screen.getByText('Irrigation Recommended')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('handles get prediction click correctly', async () => {
    const getPrediction = vi.fn();
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: null,
      isLoading: false,
      error: null,
      getPrediction
    });

    render(<MLPredictionDisplay />);
    const button = screen.getByRole('button', { name: /get prediction/i });
    fireEvent.click(button);

    expect(getPrediction).toHaveBeenCalledWith(mockSensorData);
  });

  it('shows error toast when prediction fails', async () => {
    const getPrediction = vi.fn().mockRejectedValue(new Error('API Error'));
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: null,
      isLoading: false,
      error: null,
      getPrediction
    });

    render(<MLPredictionDisplay />);
    const button = screen.getByRole('button', { name: /get prediction/i });
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith('Failed to get prediction');
  });

  it('displays low confidence warning when appropriate', () => {
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: { ...mockPrediction, probability: 0.55 },
      isLoading: false,
      error: null,
      getPrediction: vi.fn()
    });

    render(<MLPredictionDisplay />);
    expect(screen.getByText(/Low confidence prediction/)).toBeInTheDocument();
  });

  it('shows sensor data used for prediction', () => {
    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: mockPrediction,
      isLoading: false,
      error: null,
      getPrediction: vi.fn()
    });

    render(<MLPredictionDisplay />);
    expect(screen.getByText('650')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });
});