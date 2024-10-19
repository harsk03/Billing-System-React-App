import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantInfo = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    fetchRestaurantInfo();
  }, []);

  const fetchRestaurantInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurant-info');
      setRestaurantInfo(response.data);
    } catch (error) {
      console.error('Error fetching restaurant info:', error);
    }
  };

  const handleInputChange = (e) => {
    setRestaurantInfo({
      ...restaurantInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/restaurant-info', restaurantInfo);
      alert('Restaurant information updated successfully!');
    } catch (error) {
      console.error('Error updating restaurant info:', error);
      alert('Failed to update restaurant information.');
    }
  };

  return (
    <div className="restaurant-info-container">
      <h2>Restaurant Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Restaurant Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={restaurantInfo.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Restaurant Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={restaurantInfo.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default RestaurantInfo;