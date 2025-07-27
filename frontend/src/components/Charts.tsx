import React from 'react';
import {
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface StockData {
  date: string;
  open: number;
  close: number;
  volume: number;
}

interface ChartsProps {
  stockData: StockData[];
}

const Charts: React.FC<ChartsProps> = ({ stockData }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Stock Price Trends
      </Typography>
      
      <Box sx={{ height: 300, mb: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="open" 
              stroke="#8884d8" 
              strokeWidth={2}
              name="Open Price"
            />
            <Line 
              type="monotone" 
              dataKey="close" 
              stroke="#82ca9d" 
              strokeWidth={2}
              name="Close Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="h6" gutterBottom>
        Trading Volume
      </Typography>
      
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="volume" fill="#ffc658" name="Volume" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default Charts;
