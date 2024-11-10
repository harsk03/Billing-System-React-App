// server/routes/customers.js

// Import necessary modules
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new customer
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error('Error deleting customer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT to update a customer by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error('Error updating customer:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/customers/check-phone/:phone', async (req, res) => {
  try {
    const { phone } = req.params;
    const existingCustomer = await Customer.findOne({ where: { phone } });
    res.json({ exists: !!existingCustomer });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
