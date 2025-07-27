# Stock Market Risk Prediction & Trend Analysis Dashboard

## Overview
A comprehensive Python-based stock market risk prediction and trend analysis dashboard featuring:
- **Backend**: Flask API with machine learning models using pandas, numpy, scikit-learn, and SQLAlchemy
- **Frontend**: React TypeScript dashboard with Material-UI components and interactive charts
- **Data Visualization**: Real-time charts using Recharts library
- **Risk Prediction**: ML-powered risk assessment with user-friendly interface

## Project Structure
```
├── api/                 # Flask backend
│   └── app.py          # Main Flask application
├── data/               # Data processing scripts
│   └── ingest.py       # Data ingestion and preprocessing
├── models/             # Machine learning models
│   └── train.py        # Model training script
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.tsx     # Main React app
│   └── package.json    # Frontend dependencies
├── requirements.txt    # Python dependencies
└── .vscode/           # VS Code configuration
    └── tasks.json     # Build and run tasks
```

## Features
- **Dashboard Overview**: Real-time statistics and key metrics
- **Interactive Charts**: Stock price trends and volume analysis
- **Risk Prediction Form**: ML-powered risk assessment
- **Data Tables**: Historical data and prediction results
- **Responsive Design**: Mobile-friendly Material-UI interface

## Setup Instructions

### 1. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Generate sample data (optional)
python data/ingest.py

# Train basic model (optional)
python models/train.py

# Start Flask API
python api/app.py
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start React development server
npm start
```

### 3. Using VS Code Tasks
You can use the pre-configured VS Code tasks:
- **Ctrl+Shift+P** → "Tasks: Run Task"
- Select "Start Flask API" or "Start React Frontend"

## API Endpoints
- `GET /` - API health check
- `POST /predict` - Risk prediction endpoint
- `GET /data` - Sample stock data

## Usage
1. Start the Flask backend (runs on http://localhost:5000)
2. Start the React frontend (runs on http://localhost:3000)
3. Open your browser to http://localhost:3000
4. Use the prediction form to input stock data and get risk assessments
5. View charts and data tables for analysis

## Deployment Notes
- **AWS EC2**: Containerize with Docker for easy deployment
- **Tableau Integration**: Export data via `/data` endpoint for Tableau dashboards
- **Database**: Replace SQLite with PostgreSQL for production

## Technology Stack
- **Python**: pandas, numpy, scikit-learn, Flask, SQLAlchemy
- **Frontend**: React, TypeScript, Material-UI, Recharts
- **API**: Flask with CORS support
- **Charts**: Recharts for data visualization
- **Deployment**: Docker-ready for AWS EC2

## Next Steps
1. Integrate real stock data APIs (Yahoo Finance, Alpha Vantage)
2. Implement more sophisticated ML models
3. Add user authentication and data persistence
4. Create Tableau dashboard templates
5. Deploy to AWS with CI/CD pipeline
