from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Dummy model and data for minimal API
model = LogisticRegression()
X_dummy = np.array([[0, 1], [1, 0]])
y_dummy = np.array([0, 1])
model.fit(X_dummy, y_dummy)

data = pd.DataFrame({'feature1': [0, 1], 'feature2': [1, 0]})

@app.route('/')
def home():
    return 'Stock Market Risk Prediction API is running.'

@app.route('/predict', methods=['POST'])
def predict():
    features = request.json.get('features')
    if features is None:
        return jsonify({'error': 'No features provided'}), 400
    prediction = model.predict([features])
    return jsonify({'prediction': int(prediction[0])})

@app.route('/data', methods=['GET'])
def get_data():
    # Return sample stock data
    sample_data = [
        {'date': '2025-07-01', 'open': 100, 'close': 102, 'volume': 1000},
        {'date': '2025-07-02', 'open': 102, 'close': 101, 'volume': 1100},
        {'date': '2025-07-03', 'open': 101, 'close': 105, 'volume': 1200},
        {'date': '2025-07-04', 'open': 105, 'close': 103, 'volume': 900},
        {'date': '2025-07-05', 'open': 103, 'close': 108, 'volume': 1300},
    ]
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run(debug=True)
