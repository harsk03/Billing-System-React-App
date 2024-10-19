// server/models/Bill.js
const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  totalAmount: { type: Number, default: 0 },
  billCount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', BillSchema);