from flask import Flask, jsonify
from flask_cors import CORS
import math
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
API_PORT = 8001

def generate_mock_sensor_data():
    """
    Generates realistic mock sensor data following the same pattern as mockSensor.ts
    """
    current_time = time.time()
    hour_of_day = datetime.now().hour
    
    # Moisture calculation (similar to mockSensor.ts)
    base_moisture = 650
    moisture_variation = math.sin(current_time / 3600) * 50  # Hourly sine wave
    random_moisture = (hash(str(current_time)) % 100) - 50  # Random variation
    moisture = max(400, min(900, base_moisture + moisture_variation + random_moisture))
    
    # Temperature calculation (similar to mockSensor.ts)
    base_temp = 25
    temp_cycle = math.sin((hour_of_day - 6) * math.pi / 12) * 8  # Peak at 12:00, low at 00:00
    random_temp = (hash(str(current_time + 1)) % 40) / 20 - 1  # Random variation
    temperature = max(0, min(40, base_temp + temp_cycle + random_temp))
    
    return {
        "moisture": round(moisture),
        "temperature": round(temperature * 10) / 10
    }

@app.route('/api/getCurrentReading', methods=['GET'])
def get_current_reading():
    """
    Mock endpoint that returns simulated sensor data
    """
    try:
        # Add a small random delay to simulate real sensor reading
        time.sleep(0.1)
        
        data = generate_mock_sensor_data()
        return jsonify(data), 200
        
    except Exception as e:
        return jsonify({
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        "status": "healthy",
        "mode": "mock",
        "timestamp": datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    try:
        print(f"Starting mock sensor API server on port {API_PORT}...")
        print("Note: This is a mock server for testing - no real sensors required")
        app.run(host='0.0.0.0', port=API_PORT, debug=True)
    except Exception as e:
        print(f"Failed to start server: {e}")
