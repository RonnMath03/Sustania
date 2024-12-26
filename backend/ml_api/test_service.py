import requests
import json
from datetime import datetime
import time
import random

def generate_test_data():
    """Generate realistic test data for wheat irrigation"""
    return {
        "moisture": random.uniform(400, 900),
        "temperature": random.uniform(0, 40)
    }

def test_service():
    """Test the wheat irrigation prediction service"""
    base_url = "http://localhost:8000"
    
    print("Testing Wheat Irrigation Prediction Service...")
    print("-" * 50)
    
    # Test health check
    print("\n1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✓ Health check successful")
            print(f"Response: {response.json()}")
        else:
            print("✗ Health check failed")
    except Exception as e:
        print(f"✗ Error: {str(e)}")

    # Test model info
    print("\n2. Testing model info endpoint...")
    try:
        response = requests.get(f"{base_url}/model-info")
        if response.status_code == 200:
            print("✓ Model info retrieved successfully")
            print(f"Response: {response.json()}")
        else:
            print("✗ Model info request failed")
    except Exception as e:
        print(f"✗ Error: {str(e)}")
    
    # Test prediction endpoint
    print("\n3. Testing prediction endpoint...")
    try:
        test_data = generate_test_data()
        print(f"Sending test data: {json.dumps(test_data, indent=2)}")
        
        response = requests.post(f"{base_url}/predict", json=test_data)
        if response.status_code == 200:
            result = response.json()
            print("✓ Prediction successful")
            print(f"Need irrigation: {result['need_irrigation']}")
            print(f"Probability: {result['probability']:.2f}")
            print(f"Timestamp: {result['timestamp']}")
        else:
            print("✗ Prediction failed")
            print(f"Error: {response.json()}")
    except Exception as e:
        print(f"✗ Error: {str(e)}")

if __name__ == "__main__":
    test_service()