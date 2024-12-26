import { body, validationResult } from 'express-validator';

export const validateSensorData = [
  body('moisture')
    .isFloat({ min: 400, max: 900 })
    .withMessage('Moisture must be between 400 and 900'),
  body('temperature')
    .isFloat({ min: 0, max: 40 })
    .withMessage('Temperature must be between 0 and 40°C'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];