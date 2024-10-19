const express = require('express');
const router = express.Router();
const RestaurantInfo = require('../models/RestaurantInfo');

// Get restaurant info
router.get('/', async (req, res) => {
  try {
    let info = await RestaurantInfo.findOne();
    if (!info) {
      info = new RestaurantInfo({ name: '', address: '' });
      await info.save();
    }
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update restaurant info
router.post('/', async (req, res) => {
  try {
    let info = await RestaurantInfo.findOne();
    if (info) {
      info.name = req.body.name;
      info.address = req.body.address;
    } else {
      info = new RestaurantInfo({
        name: req.body.name,
        address: req.body.address
      });
    }
    await info.save();
    res.json(info);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;