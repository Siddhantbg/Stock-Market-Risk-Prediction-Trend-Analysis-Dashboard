"""
Data Ingestion Module for Stock Market Risk Prediction

This module handles data ingestion from various sources including
stock market APIs, CSV files, and other data sources.
"""

import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

def fetch_stock_data(symbol, period='1y'):
    """
    Fetch stock data for a given symbol
    
    Args:
        symbol (str): Stock symbol (e.g., 'AAPL', 'GOOGL')
        period (str): Time period for data ('1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max')
    
    Returns:
        pandas.DataFrame: Stock data with OHLCV information
    """
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period=period)
        return data
    except Exception as e:
        print(f"Error fetching data for {symbol}: {e}")
        return None

def load_csv_data(filepath):
    """
    Load stock data from CSV file
    
    Args:
        filepath (str): Path to CSV file
    
    Returns:
        pandas.DataFrame: Loaded data
    """
    try:
        data = pd.read_csv(filepath)
        return data
    except Exception as e:
        print(f"Error loading CSV data: {e}")
        return None

if __name__ == "__main__":
    # Example usage
    data = fetch_stock_data('AAPL', '6mo')
    if data is not None:
        print(data.head())
        data.to_csv('stock_data.csv')
