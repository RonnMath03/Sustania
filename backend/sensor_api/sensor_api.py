from flask import Flask, jsonify
from flask_cors import CORS
import serial
import time
import threading
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configuration
SENSOR_PORT = 'COM9'
API_PORT = 8001

# Global variable for the serial connection
arduino = None
arduino_lock = threading.Lock()

def map_value(value, in_min, in_max, out_min, out_max):
    """Map a value from one range to another"""
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

def get_arduino_connection():
    global arduino
    with arduino_lock:
        if arduino is None or not arduino.is_open:
            try:
                arduino = serial.Serial(port=SENSOR_PORT, baudrate=9600, timeout=1)
                time.sleep(2)  # Give time for connection to stabilize
            except serial.SerialException as e:
                print(f"Error opening serial port: {e}")
                arduino = None
    return arduino

def read_arduino_data():
    """
    Reads data from Arduino and maps the values to the frontend's expected range
    Raw sensor: 1023 (fully dry) to 0 (maximum wet)
    Frontend expects: 400 (driest) to 900 (wettest)
    """
    arduino = get_arduino_connection()
    if arduino:
        try:
            data = arduino.readline().decode('utf-8').strip()
            if data:
                parts = data.split(",")
                if len(parts) == 6:
                    # Get raw moisture value (0-1023) and temperature
                    raw_moisture = float(parts[5])
                    temperature_c = float(parts[1])
                    
                    # Constrain raw moisture value
                    raw_moisture = max(0, min(1023, raw_moisture))
                    
                    # Map the moisture value:
                    # Input: 1023 (dry) -> 0 (wet)
                    # Output: 400 (dry) -> 900 (wet)
                    moisture = map_value(raw_moisture, 1023, 0, 400, 900)
                    
                    # Ensure temperature is within valid range
                    temperature_c = max(0, min(40, temperature_c))
                    
                    return {
                        'moisture': round(moisture),  # Round to nearest integer
                        'temperature': round(temperature_c * 10) / 10  # Round to 1 decimal
                    }
        except Exception as e:
            print(f"Error reading sensor data: {e}")
            raise Exception("Failed to read sensor data")
    raise Exception("No connection to sensor")

@app.route('/api/getCurrentReading', methods=['GET'])
def get_current_reading():
    """
    Endpoint that returns mapped sensor values in the format expected by frontend
    """
    try:
        data = read_arduino_data()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint that includes mapping ranges
    """
    return jsonify({
        "status": "healthy",
        "sensor_moisture_range": "0 (wet) - 1023 (dry)",
        "frontend_moisture_range": "400 (dry) - 900 (wet)",
        "temperature_range": "0-40°C",
        "timestamp": datetime.now().isoformat()
    }), 200

def cleanup():
    """Ensure serial connection is closed when app shuts down"""
    global arduino
    if arduino and arduino.is_open:
        arduino.close()

if __name__ == '__main__':
    try:
        import atexit
        atexit.register(cleanup)
        
        print(f"""
Starting sensor API server on port {API_PORT}...
Moisture value mapping:
  - Sensor input: 1023 (fully dry) to 0 (maximum wet)
  - Frontend output: 400 (driest) to 900 (wettest)
Temperature range: 0-40°C
        """)
        app.run(host='0.0.0.0', port=API_PORT, debug=True, threaded=True)
    except Exception as e:
        print(f"Failed to start server: {e}")
        cleanup()