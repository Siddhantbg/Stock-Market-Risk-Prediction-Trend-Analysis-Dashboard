import pandas as pd
from sklearn.linear_model import LogisticRegression
import pickle
import os

def train_model():
    # Load sample data
    df = pd.read_csv('data/stock_data.csv')
    # Minimal feature engineering
    df['target'] = (df['close'] > df['open']).astype(int)
    X = df[['open', 'close', 'volume']]
    y = df['target']
    model = LogisticRegression()
    model.fit(X, y)
    os.makedirs('models', exist_ok=True)
    with open('models/model.pkl', 'wb') as f:
        pickle.dump(model, f)
    print('Model trained and saved to models/model.pkl')

if __name__ == '__main__':
    train_model()
