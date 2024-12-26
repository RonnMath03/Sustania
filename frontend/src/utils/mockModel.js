export const mockModel = {
  predict(moisture, temperature) {
    // Mock ML model logic
    const moistureNormalized = (moisture - 400) / 500;
    const tempNormalized = temperature / 40;
    
    // Simple probability calculation for demo
    const probability = (moistureNormalized + tempNormalized) / 2;
    const needIrrigation = probability < 0.5;
    
    return {
      needIrrigation,
      probability: Math.max(0, Math.min(1, probability))
    };
  }
};