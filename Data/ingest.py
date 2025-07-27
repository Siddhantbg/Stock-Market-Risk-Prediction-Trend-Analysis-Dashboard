import pandas as pd
import os

def load_sample_data():
    # Minimal sample data for demonstration
    data = pd.DataFrame({
        'date': ['2025-07-01', '2025-07-02'],
        'open': [100, 102],
        'close': [102, 101],
        'volume': [1000, 1100]
    })
    os.makedirs('data', exist_ok=True)
    data.to_csv('data/stock_data.csv', index=False)
    print('Sample data saved to data/stock_data.csv')

if __name__ == '__main__':
    load_sample_data()
