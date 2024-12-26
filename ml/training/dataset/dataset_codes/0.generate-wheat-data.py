import pandas as pd
import numpy as np
from scipy.stats import truncnorm

def get_truncated_normal(mean=0, sd=1, low=-10, upp=10, size=1000):
    """Generate truncated normal distribution"""
    return truncnorm(
        (low - mean) / sd, (upp - mean) / sd, loc=mean, scale=sd
    ).rvs(size)

# Set parameters for wheat in Kerala climate
wheat_moisture_min = 400
wheat_moisture_max = 900
wheat_temp_min = 22    # Kerala's minimum temperature rarely goes below 22°C
wheat_temp_max = 35    # Maximum temperature in Kerala typically around 35°C

# Number of samples
n_samples = 10000

# Set random seed for reproducibility
np.random.seed(42)

# Define Kerala's seasonal patterns
kerala_seasons = {
    'winter': {  # December-February: Relatively cool and dry
        'temp_mean': 24,
        'temp_std': 1.5,
        'moisture_mean': 550,
        'moisture_std': 70,
        'size': int(n_samples * 0.25)
    },
    'summer': {  # March-May: Hot and humid
        'temp_mean': 32,
        'temp_std': 2,
        'moisture_mean': 600,
        'moisture_std': 80,
        'size': int(n_samples * 0.25)
    },
    'southwest_monsoon': {  # June-September: Heavy rainfall
        'temp_mean': 28,
        'temp_std': 2,
        'moisture_mean': 800,
        'moisture_std': 60,
        'size': int(n_samples * 0.3)
    },
    'northeast_monsoon': {  # October-November: Moderate rainfall
        'temp_mean': 26,
        'temp_std': 2,
        'moisture_mean': 700,
        'moisture_std': 70,
        'size': int(n_samples * 0.2)
    }
}

# Generate temperature and moisture values for each season
temp_values = []
moisture_values = []

for season, params in kerala_seasons.items():
    # Temperature values
    temp = get_truncated_normal(
        mean=params['temp_mean'],
        sd=params['temp_std'],
        low=wheat_temp_min,
        upp=wheat_temp_max,
        size=params['size']
    )
    temp_values.extend(temp)
    
    # Moisture values
    moisture = get_truncated_normal(
        mean=params['moisture_mean'],
        sd=params['moisture_std'],
        low=wheat_moisture_min,
        upp=wheat_moisture_max,
        size=params['size']
    )
    moisture_values.extend(moisture)

# Add remaining samples to reach exactly n_samples (if any)
remaining = n_samples - len(temp_values)
if remaining > 0:
    # Add remaining samples with average conditions
    temp_extra = get_truncated_normal(
        mean=28,
        sd=2,
        low=wheat_temp_min,
        upp=wheat_temp_max,
        size=remaining
    )
    moisture_extra = get_truncated_normal(
        mean=650,
        sd=70,
        low=wheat_moisture_min,
        upp=wheat_moisture_max,
        size=remaining
    )
    temp_values.extend(temp_extra)
    moisture_values.extend(moisture_extra)

# Convert to numpy arrays
moisture_values = np.array(moisture_values)
temp_values = np.array(temp_values)

def decide_pump(moisture, temp):
    """
    Determine pump status based on moisture and temperature with Kerala-specific conditions
    """
    # Base conditions adjusted for Kerala's climate
    # Higher temperature threshold due to Kerala's tropical climate
    needs_water = (
        (moisture < 600) |  # Low moisture threshold
        (temp > 30) |      # High temperature threshold
        ((moisture < 650) & (temp > 28))  # Combined condition for moderate stress
    )
    
    # Add uncertainty near thresholds
    threshold_uncertainty = (
        ((moisture >= 580) & (moisture <= 620)) |
        ((temp >= 29) & (temp <= 31))
    )
    
    # Add some randomness near thresholds
    random_decision = np.random.random(len(moisture)) < 0.5
    
    # Combine conditions
    final_decision = np.where(
        threshold_uncertainty,
        random_decision,
        needs_water
    )
    
    return final_decision.astype(int)

# Generate pump values
pump_values = decide_pump(moisture_values, temp_values)

# Create the dataset
wheat_data = pd.DataFrame({
    'crop': ['wheat'] * n_samples,
    'moisture': moisture_values.round().astype(int),
    'temp': temp_values.round().astype(int),
    'pump': pump_values
})

# Shuffle the dataset
wheat_data = wheat_data.sample(frac=1, random_state=42).reset_index(drop=True)

# Save to CSV
wheat_data.to_csv('input_dataset.csv', index=False)

# Print summary statistics
print("\nDataset Summary:")
print(f"Total number of samples: {len(wheat_data)}")
print(f"Number of irrigation events (pump=1): {wheat_data['pump'].sum()}")
print(f"Irrigation frequency: {wheat_data['pump'].mean() * 100:.2f}%")

print("\nTemperature Statistics:")
print(wheat_data['temp'].describe())
print("\nMoisture Statistics:")
print(wheat_data['moisture'].describe())

print("\nSeasonal Analysis:")
# Create season bins based on temperature
wheat_data['season'] = pd.cut(
    wheat_data['temp'],
    bins=[21, 25, 28, 31, 36],
    labels=['Winter', 'Spring', 'Monsoon', 'Summer']
)

print("\nIrrigation Needs by Season:")
print(wheat_data.groupby('season')['pump'].mean() * 100)

# Data quality verification
print("\nData Quality Check:")
print("Temperature range:", wheat_data['temp'].min(), "-", wheat_data['temp'].max())
print("Moisture range:", wheat_data['moisture'].min(), "-", wheat_data['moisture'].max())

# Sample data points
print("\nSample data points (pump=1):")
print(wheat_data[wheat_data['pump'] == 1].head())
print("\nSample data points (pump=0):")
print(wheat_data[wheat_data['pump'] == 0].head())