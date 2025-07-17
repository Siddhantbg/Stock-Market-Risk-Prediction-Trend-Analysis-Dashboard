const mongoose = require('mongoose');

const allowedCategories = [
  'Salary',
  'Groceries',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Travel',
  'Dining',
  'Education',
  'Investment',
  'Miscellaneous'
];

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: String, enum: allowedCategories, required: true },
  description: { type: String },
  transactionType: { type: String, enum: ['debit', 'credit'], required: true },
  timestamp: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  income: { type: mongoose.Schema.Types.ObjectId, ref: 'Income' }, // Reference to Income model
});

module.exports = mongoose.model('Transaction', TransactionSchema);