import { logger } from '../utils/logger.js';
import { mockModel } from '../utils/mockModel.js';

export const predictIrrigation = async (req, res, next) => {
  try {
    const { moisture, temperature } = req.body;
    const prediction = mockModel.predict(moisture, temperature);
    
    res.json({
      need_irrigation: prediction.needIrrigation,
      probability: prediction.probability,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Prediction error:', error);
    next(error);
  }
};

export const getModelInfo = (req, res) => {
  res.json({
    model_type: 'Random Forest Classifier',
    features_required: ['moisture', 'temperature'],
    version: '1.0'
  });
};