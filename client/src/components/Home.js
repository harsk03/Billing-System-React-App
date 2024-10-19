// client/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaFileInvoice } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [stats, setStats] = useState({ totalEarnings: 0, totalBills: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bills/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-item">
          <h2>
            <FaRupeeSign /> Total Earnings
          </h2>
          <p>₹ {stats.totalEarnings.toFixed(2)}</p>
        </div>
        <div className="stat-item">
          <h2>
            <FaFileInvoice /> Total Bills
          </h2>
          <p>{stats.totalBills}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;