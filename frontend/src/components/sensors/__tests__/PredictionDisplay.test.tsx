import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PredictionDisplay } from '../PredictionDisplay';

describe('PredictionDisplay', () => {
  const mockPrediction = {
    need_irrigation: true,
    probability: 0.85,
    timestamp: new Date().toISOString(),
  };

  it('renders loading state correctly', () => {
    render(<PredictionDisplay prediction={mockPrediction} isLoading={true} />);
    expect(screen.getByTestId('prediction-loading')).toBeInTheDocument();
  });

  it('displays irrigation recommendation correctly', () => {
    render(<PredictionDisplay prediction={mockPrediction} isLoading={false} />);
    expect(screen.getByText('Irrigation Recommended')).toBeInTheDocument();
  });

  it('shows high confidence prediction with correct styling', () => {
    render(<PredictionDisplay prediction={mockPrediction} isLoading={false} />);
    expect(screen.getByText('85%')).toHaveClass('text-green-600');
  });

  it('shows low confidence prediction with correct styling', () => {
    const lowConfidencePrediction = {
      ...mockPrediction,
      probability: 0.35,
    };

    render(<PredictionDisplay prediction={lowConfidencePrediction} isLoading={false} />);
    expect(screen.getByText('35%')).toHaveClass('text-red-600');
  });

  it('displays timestamp in correct format', () => {
    const date = new Date('2023-12-25T12:00:00Z');
    const predictionWithDate = {
      ...mockPrediction,
      timestamp: date.toISOString(),
    };

    render(<PredictionDisplay prediction={predictionWithDate} isLoading={false} />);
    expect(screen.getByText(/December 25, 2023/)).toBeInTheDocument();
  });

  it('shows no irrigation needed message when appropriate', () => {
    const noIrrigationPrediction = {
      ...mockPrediction,
      need_irrigation: false,
    };

    render(<PredictionDisplay prediction={noIrrigationPrediction} isLoading={false} />);
    expect(screen.getByText('No Irrigation Needed')).toBeInTheDocument();
  });
});