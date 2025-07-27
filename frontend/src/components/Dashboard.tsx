import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import PredictionForm from './PredictionForm';
import DataTable from './DataTable';
import Charts from './Charts';
import StatsCards from './StatsCards';
import axios from 'axios';

interface StockData {
  date: string;
  open: number;
  close: number;
  volume: number;
}

const Dashboard: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load initial data (mock data for now)
    const mockData: StockData[] = [
      { date: '2025-07-01', open: 100, close: 102, volume: 1000 },
      { date: '2025-07-02', open: 102, close: 101, volume: 1100 },
      { date: '2025-07-03', open: 101, close: 105, volume: 1200 },
      { date: '2025-07-04', open: 105, close: 103, volume: 900 },
      { date: '2025-07-05', open: 103, close: 108, volume: 1300 },
    ];
    setStockData(mockData);
  }, []);

  const handlePrediction = async (features: number[]) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        features: features,
      });
      const newPrediction = {
        id: Date.now(),
        features: features,
        prediction: response.data.prediction,
        timestamp: new Date().toISOString(),
      };
      setPredictions(prev => [newPrediction, ...prev]);
    } catch (error) {
      console.error('Prediction error:', error);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <StatsCards stockData={stockData} predictions={predictions} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Charts stockData={stockData} />
        </Grid>

        {/* Prediction Form */}
        <Grid item xs={12} md={4}>
          <PredictionForm onPredict={handlePrediction} loading={loading} />
        </Grid>

        {/* Data Table */}
        <Grid item xs={12}>
          <DataTable stockData={stockData} predictions={predictions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
