import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SensorForm } from '../SensorForm';
import { useSensorPrediction } from '../../../hooks/useSensorPrediction';
import toast from 'react-hot-toast';

// Mock dependencies
vi.mock('../../../hooks/useSensorPrediction');
vi.mock('react-hot-toast');

describe('SensorForm', () => {
  const mockGetPrediction = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useSensorPrediction).mockReturnValue({
      getPrediction: mockGetPrediction,
      isLoading: false,
      prediction: null,
      error: null,
    });
  });

  it('renders both sensor and manual modes', () => {
    render(<SensorForm />);
    expect(screen.getByRole('combobox')).toHaveValue('sensor');
    expect(screen.getByText('Sensor Reading')).toBeInTheDocument();
  });

  it('switches between sensor and manual modes', async () => {
    render(<SensorForm />);
    const modeSelect = screen.getByRole('combobox');
    
    await userEvent.selectOptions(modeSelect, 'manual');
    expect(screen.getByLabelText('Soil Moisture (400-900)')).toBeInTheDocument();
    
    await userEvent.selectOptions(modeSelect, 'sensor');
    expect(screen.getByText('Current Sensor Values:')).toBeInTheDocument();
  });

  it('validates manual input ranges', async () => {
    render(<SensorForm />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'manual');

    const moistureInput = screen.getByLabelText('Soil Moisture (400-900)');
    const temperatureInput = screen.getByLabelText('Temperature (0-40°C)');

    await userEvent.type(moistureInput, '1000');
    await userEvent.type(temperatureInput, '50');

    expect(screen.getByText('Must be between 400 and 900')).toBeInTheDocument();
    expect(screen.getByText('Must be between 0 and 40°C')).toBeInTheDocument();
  });

  it('handles sensor reading refresh', async () => {
    render(<SensorForm />);
    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    
    await userEvent.click(refreshButton);
    expect(toast.success).toHaveBeenCalledWith('Sensor data updated');
  });

  it('submits prediction request with valid data', async () => {
    render(<SensorForm />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'manual');

    const moistureInput = screen.getByLabelText('Soil Moisture (400-900)');
    const temperatureInput = screen.getByLabelText('Temperature (0-40°C)');

    await userEvent.type(moistureInput, '600');
    await userEvent.type(temperatureInput, '25');

    const submitButton = screen.getByRole('button', { name: /get prediction/i });
    await userEvent.click(submitButton);

    expect(mockGetPrediction).toHaveBeenCalledWith({
      moisture: 600,
      temperature: 25,
    });
  });

  it('displays loading state during prediction', () => {
    vi.mocked(useSensorPrediction).mockReturnValue({
      getPrediction: mockGetPrediction,
      isLoading: true,
      prediction: null,
      error: null,
    });

    render(<SensorForm />);
    expect(screen.getByText('Getting Prediction...')).toBeInTheDocument();
  });

  it('handles prediction errors', async () => {
    mockGetPrediction.mockRejectedValue(new Error('Prediction failed'));
    
    render(<SensorForm />);
    const getPredictionButton = screen.getByRole('button', { name: /get prediction/i });
    
    await userEvent.click(getPredictionButton);
    expect(toast.error).toHaveBeenCalledWith('Failed to get prediction');
  });
});