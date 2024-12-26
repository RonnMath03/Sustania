# 🌱 Sustania - Digital Farming Solutions

A machine learning powered digital farming system that combines IoT sensors and predictive analytics to optimize crop health monitoring and irrigation management.

## 🎯 Project Overview

Sustania revolutionizes agricultural practices by integrating IoT sensors with advanced machine learning algorithms to provide real-time soil monitoring and smart irrigation recommendations. The system features a modern React-based dashboard for data visualization and intelligent decision support based on Random Forest predictions.

### Key Features
- **Smart Soil Monitoring** 💧
  - Real-time moisture tracking
  - Soil condition analysis
  - Automated sensor readings
  - Historical data logging

- **ML-Powered Predictions** 🤖
  - Random Forest model integration
  - Predictive analytics
  - Intelligent irrigation recommendations
  - Performance optimization

- **Interactive Dashboard** 📊
  - Real-time data visualization
  - Sensor status monitoring
  - Trend analysis
  - User-friendly interface

## 🎥 Demo
[![Sustania Demo](https://img.youtube.com/vi/zoHDsw1C6gM/0.jpg)](https://www.youtube.com/watch?v=zoHDsw1C6gM)

*Click to watch the demo video on YouTube*

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Python 3.x
- Arduino Nano with required sensors

### Installation

1. Clone the repository
```bash
git clone https://github.com/RonnMath03/Sustania.git
cd Sustania
```

2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

3. Backend Setup

 - Create and activate virtual environment
 ```bash
 cd backend
 python -m venv sustania_env
 
 # On Windows
 sustania_env\Scripts\activate
 # On Unix/MacOS
 source sustania_env/bin/activate
 ```
 - Install dependencies
 ```bash
 pip install -r requirements.txt
 ```
 
 - Start the backend services
 ```bash
 # Terminal 1 - ML API
 cd ml_api
 python irrigation_api.py
 
 # Terminal 2 - Sensor API
 cd sensor_api
 python sensor_api.py
 ```

4. Sensor Configuration

- Check your Arduino Nano's port:
```bash
# On Windows
# Check Device Manager > Ports (COM & LPT)
# Note the COM port number (e.g., COM3, COM4)

# On Linux
ls /dev/tty*
# Usually appears as /dev/ttyUSB0 or /dev/ttyACM0

# On MacOS
ls /dev/tty.*
# Usually appears as /dev/tty.usbserial-* or /dev/tty.usbmodem*
```

- Modify the port in `sensor_api.py`:
```python
# Find this line in sensor_api.py
SENSOR_PORT = 'COM9' # Default Windows port

# Change 'COM9' to your port:
# Windows: 'COM4' (or whatever port number shown in Device Manager)
# Linux: '/dev/ttyUSB0' or '/dev/ttyACM0'
# MacOS: '/dev/tty.usbserial-XXXX' or '/dev/tty.usbmodem-XXXX'
```
- ⚠️ **Note**: Make sure to identify and use the correct port number where your Arduino Nano is connected. Incorrect port configuration will prevent sensor communication.


5. Running Without Physical Sensors

- Use mock sensor server instead of the actual sensor API:
```bash
# Instead of sensor_api.py, run:
python mock_sensor_server.py
```

- The mock server simulates sensor data for:
  - Soil Moisture
  - Temperature

- This allows you to test and demonstrate the system's functionality without physical hardware. The mock server generates realistic sensor values within typical ranges to simulate actual field conditions.

- ⚠️ **Note**: Remember to switch back to `sensor_api.py` when working with actual sensors.

## 🛠️ Technology Stack

### Frontend
- React 18.2.0
- TypeScript
- Tailwind CSS
- Vite
- Recharts for data visualization
- Zustand for state management
- React Router DOM
- Axios for API communication

### Backend
- Python
- Flask/FastAPI for API endpoints
- Arduino sensor integration
- Random Forest model deployment

### Machine Learning
- scikit-learn
- Pandas
- NumPy
- Joblib for model serialization

### Testing & Development
- Vitest
- React Testing Library
- ESLint
- TypeScript

## 📂 Project Structure
```
sustania/
├── frontend/              # React + TypeScript frontend
├── backend/              
│   ├── ml_api/           # ML model API
│   └── sensor_api/       # Sensor communication
├── ml/
│   ├── models/           # Trained models
│   ├── training/         # Training scripts
│   └── model_comparison/ # Model evaluation
├── docs/                 # Documentation
└── media/                # Project media
```

## 📚 Documentation
- Research Papers
  - IEEE Format Publication
  - Springer Format Publication
- Technical Documentation
  - Project Report
  - API Documentation
  - Model Training Process
- Testing Documentation
  - Sensor Mock Testing
  - API Integration Tests

## 📝 Research Publications
- [Sustania: A Digital Farming Ecosystem for
Smart Agriculture](https://github.com/RonnMath03/Sustania/blob/main/docs/research_papers/Sustania%20Research%20Paper%20IEEE%20Format%20(Longer).pdf) - IEEE Format
- [Sustania: A Digital Farming Ecosystem for
Smart Agriculture](https://github.com/RonnMath03/Sustania/blob/main/docs/research_papers/Sustania%20Research%20Paper%20Springer%20Format.pdf) - Springer Format

## 🤝 Contributing
Contributions are welcome! Please read our contributing guidelines to get started.

## 📫 Contact

For questions and support:
- Email: [ronnmathewsino@gmail.com](mailto:ronnmathewsino@gmail.com)
- GitHub Issues: [Project Issues](https://github.com/RonnMath03/Sustania/issues)

## 🙏 Acknowledgments

- Dr. Divya James (Project Guide)
- Department of CU, RSET
- All contributors and supporters
---

*This project was developed as part of B.Tech in Computer Science and Business Systems, Rajagiri School of Engineering & Technology*

