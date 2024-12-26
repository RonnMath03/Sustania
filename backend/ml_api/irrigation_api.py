# irrigation_api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from pydantic import BaseModel, Field
import joblib
import logging
from datetime import datetime
import pandas as pd

# Initialize FastAPI app
app = FastAPI(
    title="Wheat Irrigation Prediction API",
    description="API for predicting irrigation needs for wheat crops based on sensor data",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class SensorData(BaseModel):
    moisture: float = Field(
        ..., 
        ge=400, 
        le=900, 
        description="Wheat soil moisture level (400-900)"
    )
    temperature: float = Field(
        ..., 
        ge=0, 
        le=40, 
        description="Temperature in Celsius (0-40)"
    )

class PredictionResponse(BaseModel):
    need_irrigation: bool
    confidence: float  # Changed from str to float
    timestamp: datetime

# Load the trained model
try:
    model = joblib.load('irrigation_model.joblib')
    logging.info("Model loaded successfully")
except Exception as e:
    logging.error(f"Error loading model: {str(e)}")
    raise RuntimeError("Failed to load model")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/model-info")
async def model_info():
    """Get model information"""
    return {
        "model_type": "Random Forest Classifier",
        "features_required": ["moisture", "temperature"],
        "version": "1.0"
    }

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_irrigation(data: SensorData):
    """Predict irrigation needs for wheat based on sensor data"""
    try:
        features = prepare_features(data)
        probability = model.predict_proba(features)[0][1]
        need_irrigation = probability >= 0.6
        
        # Calculate confidence as decimal (0-1)
        confidence = probability if need_irrigation else (1 - probability)

        return PredictionResponse(
            need_irrigation=need_irrigation,
            confidence=confidence,  # Raw confidence value without formatting
            timestamp=datetime.now()
        )
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

def prepare_features(data: SensorData):
    """Prepare features for wheat crop predictions"""
    try:
        # Create single-row DataFrame
        input_data = pd.DataFrame({
            'moisture': [data.moisture],
            'temp': [data.temperature]
        })
        
        # Feature engineering
        input_data['moisture_normalized'] = (input_data['moisture'] - 400) / (900 - 400) * 100
        input_data['temp_normalized'] = (input_data['temp'] - input_data['temp'].min()) / \
                                      (input_data['temp'].max() - input_data['temp'].min())
        
        # Manual binning for moisture
        moisture_value = input_data['moisture'].iloc[0]
        if moisture_value < 550:
            moisture_bin = 'low'
        elif moisture_value < 700:
            moisture_bin = 'medium_low'
        elif moisture_value < 850:
            moisture_bin = 'medium_high'
        else:
            moisture_bin = 'high'
        
        input_data['moisture_bin'] = moisture_bin
        
        # Manual binning for temperature
        temp_value = input_data['temp'].iloc[0]
        if temp_value < 15:
            temp_bin = 'cold'
        elif temp_value < 25:
            temp_bin = 'optimal'
        else:
            temp_bin = 'hot'
            
        input_data['temp_bin'] = temp_bin
        
        # Create interaction features
        input_data['moisture_temp_interaction'] = input_data['moisture_normalized'] * \
                                                input_data['temp_normalized']
        
        # Generate dummy variables
        moisture_dummies = pd.get_dummies(input_data['moisture_bin'], prefix='moisture')
        temp_dummies = pd.get_dummies(input_data['temp_bin'], prefix='temp')
        
        # Ensure all expected columns are present
        expected_moisture_bins = ['moisture_low', 'moisture_medium_low', 
                                'moisture_medium_high', 'moisture_high']
        expected_temp_bins = ['temp_cold', 'temp_optimal', 'temp_hot']
        
        for col in expected_moisture_bins:
            if col not in moisture_dummies.columns:
                moisture_dummies[col] = 0
                
        for col in expected_temp_bins:
            if col not in temp_dummies.columns:
                temp_dummies[col] = 0
        
        # Select numerical features
        numerical_features = [
            'moisture_normalized', 'temp_normalized',
            'moisture', 'temp', 'moisture_temp_interaction'
        ]
        
        # Combine features
        features = pd.concat([
            input_data[numerical_features],
            moisture_dummies[expected_moisture_bins],
            temp_dummies[expected_temp_bins]
        ], axis=1)
        
        return features

    except Exception as e:
        logging.error(f"Error preparing features: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Feature preparation failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)