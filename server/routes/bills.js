// server/routes/bill.js
const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill');

// Get all bills and populate customer details
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find().populate('customer');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new bill
router.post('/', async (req, res) => {
  const bill = new Bill(req.body);
  try {
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get total earnings and total bills
router.get('/stats', async (req, res) => {
  try {
    const stats = await Bill.findOne();
    if (stats) {
      res.json({ totalEarnings: stats.totalAmount, totalBills: stats.billCount });
    } else {
      res.json({ totalEarnings: 0, totalBills: 0 });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update total earnings and bill count
router.post('/update', async (req, res) => {
  const { total } = req.body;

  try {
    const stats = await Bill.findOneAndUpdate(
      {}, 
      { 
        $inc: { 
          totalAmount: total,
          billCount: 1  // This will increment the billCount by 1
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    if (!stats) {
      // If no document was found and updated, create a new one
      const newStats = new Bill({ totalAmount: total, billCount: 1 });
      await newStats.save();
      res.status(200).json(newStats);
    } else {
      res.status(200).json(stats);
    }
  } catch (error) {
    console.error('Error updating earnings and bills:', error);
    res.status(500).json({ error: 'Failed to update earnings and bills' });
  }
});

module.exports = router;