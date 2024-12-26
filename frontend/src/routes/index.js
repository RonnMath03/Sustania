import { Router } from 'express';
import { validateSensorData } from '../middleware/validation.js';
import { predictIrrigation, getModelInfo } from '../controllers/prediction.js';

export const router = Router();

router.post('/predict', validateSensorData, predictIrrigation);
router.get('/model-info', getModelInfo);