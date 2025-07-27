import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  DataUsage,
  Warning,
} from '@mui/icons-material';

interface StockData {
  date: string;
  open: number;
  close: number;
  volume: number;
}

interface Prediction {
  id: number;
  features: number[];
  prediction: number;
  timestamp: string;
}

interface StatsCardsProps {
  stockData: StockData[];
  predictions: Prediction[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stockData, predictions }) => {
  const avgVolume = stockData.length > 0 
    ? Math.round(stockData.reduce((sum, item) => sum + item.volume, 0) / stockData.length)
    : 0;

  const lastPrice = stockData.length > 0 ? stockData[stockData.length - 1].close : 0;
  
  const riskPredictions = predictions.filter(p => p.prediction === 1).length;
  const riskPercentage = predictions.length > 0 
    ? Math.round((riskPredictions / predictions.length) * 100)
    : 0;

  const stats = [
    {
      title: 'Last Price',
      value: `$${lastPrice.toFixed(2)}`,
      icon: <TrendingUp />,
      color: '#1976d2',
    },
    {
      title: 'Avg Volume',
      value: avgVolume.toLocaleString(),
      icon: <DataUsage />,
      color: '#2e7d32',
    },
    {
      title: 'Data Points',
      value: stockData.length.toString(),
      icon: <Assessment />,
      color: '#ed6c02',
    },
    {
      title: 'Risk %',
      value: `${riskPercentage}%`,
      icon: <Warning />,
      color: '#d32f2f',
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: stat.color }}>
                  {stat.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
