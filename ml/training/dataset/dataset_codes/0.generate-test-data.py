import pandas as pd
import numpy as np

def generate_wheat_test_data():
    """
    Generate a balanced test dataset for wheat crops with appropriate ranges
    based on wheat-specific irrigation requirements
    """
    # Set random seed for reproducibility
    np.random.seed(42)
    
    # Parameters specific to wheat
    # Based on the training data ranges and wheat growing conditions
    moisture_ranges = {
        'no_irrigation': {
            'min': 650,  # Higher moisture, irrigation not needed
            'max': 850
        },
        'irrigation': {
            'min': 400,  # Lower moisture, irrigation needed
            'max': 600
        }
    }
    
    temp_ranges = {
        'no_irrigation': {
            'min': 5,   # Cooler temps, less water needed
            'max': 20
        },
        'irrigation': {
            'min': 20,  # Warmer temps, more water needed
            'max': 35
        }
    }
    
    # Generate no irrigation cases
    no_irrigation = pd.DataFrame({
        'crop': ['wheat'] * 30,
        'moisture': np.random.uniform(
            moisture_ranges['no_irrigation']['min'],
            moisture_ranges['no_irrigation']['max'],
            30
        ),
        'temp': np.random.uniform(
            temp_ranges['no_irrigation']['min'],
            temp_ranges['no_irrigation']['max'],
            30
        ),
        'pump': [0] * 30
    })
    
    # Generate irrigation needed cases
    irrigation = pd.DataFrame({
        'crop': ['wheat'] * 30,
        'moisture': np.random.uniform(
            moisture_ranges['irrigation']['min'],
            moisture_ranges['irrigation']['max'],
            30
        ),
        'temp': np.random.uniform(
            temp_ranges['irrigation']['min'],
            temp_ranges['irrigation']['max'],
            30
        ),
        'pump': [1] * 30
    })
    
    # Add some edge cases (10% of each class)
    n_edge = 3
    
    # Edge cases for no irrigation (high moisture, moderate temp)
    edge_no_irrigation = pd.DataFrame({
        'crop': ['wheat'] * n_edge,
        'moisture': np.random.uniform(800, 850, n_edge),  # Very high moisture
        'temp': np.random.uniform(15, 25, n_edge),       # Moderate temperature
        'pump': [0] * n_edge
    })
    
    # Edge cases for irrigation (low moisture, high temp)
    edge_irrigation = pd.DataFrame({
        'crop': ['wheat'] * n_edge,
        'moisture': np.random.uniform(400, 450, n_edge),  # Very low moisture
        'temp': np.random.uniform(30, 35, n_edge),       # High temperature
        'pump': [1] * n_edge
    })
    
    # Combine all cases
    test_data = pd.concat([
        no_irrigation, 
        irrigation, 
        edge_no_irrigation, 
        edge_irrigation
    ])
    
    # Shuffle and reset index
    test_data = test_data.sample(frac=1, random_state=42).reset_index(drop=True)
    
    # Round values to integers
    test_data['moisture'] = test_data['moisture'].round().astype(int)
    test_data['temp'] = test_data['temp'].round().astype(int)
    
    # Data validation
    print("\nTest Dataset Summary:")
    print(f"Total samples: {len(test_data)}")
    print(f"Class distribution:\n{test_data['pump'].value_counts()}")
    print("\nFeature ranges:")
    print(f"Moisture range: {test_data['moisture'].min()} - {test_data['moisture'].max()}")
    print(f"Temperature range: {test_data['temp'].min()} - {test_data['temp'].max()}")
    
    # Save to CSV
    test_data.to_csv('test_dataset.csv', index=False)
    print("\nGenerated wheat test dataset saved to 'wheat_test_dataset.csv'")
    
    # Additional validation
    print("\nSample records from each class:")
    print("\nNo Irrigation (pump=0):")
    print(test_data[test_data['pump'] == 0].head())
    print("\nIrrigation (pump=1):")
    print(test_data[test_data['pump'] == 1].head())

if __name__ == "__main__":
    generate_wheat_test_data()