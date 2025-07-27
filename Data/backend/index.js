
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;


// Load environment variables
require('dotenv').config();

// Connect to MongoDB
const { connectDB } = require('./src/database/config.js');
connectDB();

// CORS middleware
app.use(cors());
app.use(express.json());

// Route imports
try {
  const authRoutes = require('./src/routes/auth.js');
  const transactionRoutes = require('./src/routes/transactions.js');
  const bankRoutes = require('./src/routes/bank.js');
  const moneyTransferRoutes = require('./src/routes/moneyTransferRoutes.js');
  const FLRoutes = require('./src/routes/flashLoan.js');

  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', transactionRoutes);
  app.use('/api/bank', bankRoutes);
  app.use('/api/money-transfer', moneyTransferRoutes);
  app.use('/loan', FLRoutes);
} catch (e) {
  console.warn('Some routes could not be loaded:', e.message);
}

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
