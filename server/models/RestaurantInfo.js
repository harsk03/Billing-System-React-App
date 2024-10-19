const mongoose = require('mongoose');

const restaurantInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RestaurantInfo', restaurantInfoSchema);