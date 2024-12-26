import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePersistence } from '../usePersistence';
import { useRealtimeSensor } from '../useRealtimeSensor';
import { useSensorPrediction } from '../useSensorPrediction';
import { useSensorStore } from '../../store/sensorStore';
import { usePersistentStore } from '../../store/persistentStore';

// Mock all dependencies
vi.mock('../useRealtimeSensor');
vi.mock('../useSensorPrediction');
vi.mock('../../store/sensorStore');
vi.mock('../../store/persistentStore');

describe('usePersistence', () => {
  const mockSensorData = {
    moisture: 650,
    temperature: 25
  };

  const mockPrediction = {
    need_irrigation: true,
    probability: 0.85,
    timestamp: new Date().toISOString()
  };

  const mockHealth = {
    status: 'healthy' as const,
    lastUpdate: new Date().toISOString(),
    batteryLevel: 85
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock hook returns
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: mockSensorData,
      isLoading: false,
      error: null,
      lastUpdate: null,
      isManualFetching: false,
      manualRefresh: vi.fn()
    });

    vi.mocked(useSensorPrediction).mockReturnValue({
      prediction: mockPrediction,
      isLoading: false,
      error: null,
      getPrediction: vi.fn()
    });

    vi.mocked(useSensorStore).mockReturnValue({
      health: mockHealth
    } as any);

    vi.mocked(usePersistentStore).mockReturnValue({
      addSensorData: vi.fn(),
      addPrediction: vi.fn(),
      updateSensorHealth: vi.fn(),
      updateLastSync: vi.fn()
    } as any);
  });

  it('persists sensor data when it changes', () => {
    const { addSensorData, updateLastSync } = usePersistentStore.getState();
    renderHook(() => usePersistence());

    expect(addSensorData).toHaveBeenCalledWith(mockSensorData);
    expect(updateLastSync).toHaveBeenCalled();
  });

  it('persists predictions when they change', () => {
    const { addPrediction, updateLastSync } = usePersistentStore.getState();
    renderHook(() => usePersistence());

    expect(addPrediction).toHaveBeenCalledWith(mockPrediction);
    expect(updateLastSync).toHaveBeenCalled();
  });

  it('persists sensor health when it changes', () => {
    const { updateSensorHealth, updateLastSync } = usePersistentStore.getState();
    renderHook(() => usePersistence());

    expect(updateSensorHealth).toHaveBeenCalledWith(mockHealth);
    expect(updateLastSync).toHaveBeenCalled();
  });

  it('does not persist data when values are null', () => {
    vi.mocked(useRealtimeSensor).mockReturnValue({
      data: null,
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

    const { addSensorData, addPrediction } = usePersistentStore.getState();
    renderHook(() => usePersistence());

    expect(addSensorData).not.toHaveBeenCalled();
    expect(addPrediction).not.toHaveBeenCalled();
  });
});