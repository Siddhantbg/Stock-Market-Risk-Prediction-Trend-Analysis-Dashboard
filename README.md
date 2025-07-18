# 📊 Stock Market Risk Prediction & Trend Analysis Dashboard

A full-stack data science project for analyzing stock market behavior, predicting portfolio risk, and visualizing trends using real-world financial data. Combines Python-based data pipelines, machine learning models, Flask API deployment, and Tableau dashboards.

---

## 🔍 Problem Statement

With increasing volatility in global stock markets, investors and analysts need tools that can:
- Classify stock risk levels
- Detect patterns and anomalies in historical price data
- Present actionable insights in an interpretable, real-time format

This project addresses that need by building a robust ML pipeline from data collection to deployment.

---

## 🚀 Features

- ✅ Automated data collection from Yahoo Finance & SEC filings
- 📊 Exploratory Data Analysis (EDA) with trend, anomaly & seasonality detection
- 🧠 Predictive models for risk classification: Logistic Regression, Random Forest, XGBoost
- 🧪 Model validation using ROC-AUC, Precision, Recall, Hyperparameter tuning
- 📈 Interactive Tableau dashboard for stakeholders
- 🌐 Flask-based API deployed on AWS EC2 for real-time predictions

---

## 🧰 Tech Stack

| Component             | Tools/Frameworks Used |
|----------------------|------------------------|
| Programming Language | Python 3.x             |
| Libraries            | pandas, numpy, scikit-learn, matplotlib, seaborn, xgboost |
| Backend/API          | Flask                  |
| Dashboard            | Tableau                |
| Cloud Hosting        | AWS EC2                |
| Database             | SQL (local + mock)     |
| Version Control      | Git, GitHub            |

---

## 🛠️ Setup Instructions

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/Siddhantbg/Stock-Market-Risk-Prediction-Trend-Analysis-Dashboard.git
cd Stock-Market-Risk-Prediction-Trend-Analysis-Dashboard

# Optional: Set up virtual environment
python3 -m venv venv
source venv/bin/activate  # or use venv\Scripts\activate on Windows

# Install required packages
pip install -r requirements.txt

# Run the Flask API
python app.py
```
## Results
Achieved ROC-AUC score of 0.89 on validation set

Reduced manual risk labeling by automating predictions for incoming data

Enabled business users to track risk trends via Tableau dashboard

Deployment-ready Flask API with real-time performance logging on AWS EC2
