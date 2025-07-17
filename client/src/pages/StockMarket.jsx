import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const StockMarket = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popularStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' }
  ]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        // Note: In production, you should use your actual API key
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol: selectedStock,
            apikey: 'YOUR_API_KEY' // Replace with your Alpha Vantage API key
          }
        });

        const timeSeriesData = response.data['Time Series (Daily)'];
        const lastSevenDays = Object.keys(timeSeriesData)
          .slice(0, 7)
          .map(date => ({
            date,
            close: parseFloat(timeSeriesData[date]['4. close'])
          }))
          .reverse();

        setChartData({
          labels: lastSevenDays.map(day => day.date),
          datasets: [
            {
              label: `${selectedStock} Stock Price`,
              data: lastSevenDays.map(day => day.close),
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.4
            }
          ]
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [selectedStock]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Stock Market</h1>
          <p className="text-gray-400">Track and analyze stock market performance</p>
        </div>

        {/* Stock Selection */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-xl mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {popularStocks.map(stock => (
              <button
                key={stock.symbol}
                onClick={() => setSelectedStock(stock.symbol)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedStock === stock.symbol
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                    : 'bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-300'
                }`}
              >
                {stock.symbol}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-[400px] relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : chartData ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularStocks.map(stock => (
            <div key={stock.symbol} className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800 shadow-xl">
              <h3 className="text-lg font-semibold mb-2">{stock.name}</h3>
              <div className="text-3xl font-bold text-emerald-500 mb-2">
                ${(Math.random() * 1000).toFixed(2)}
              </div>
              <div className={`text-sm ${Math.random() > 0.5 ? 'text-emerald-500' : 'text-red-500'}`}>
                {(Math.random() * 5).toFixed(2)}% {Math.random() > 0.5 ? '↑' : '↓'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockMarket;
