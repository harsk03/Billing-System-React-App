import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

const Analysis = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchRevenueData();
    // eslint-disable-next-line
  }, [selectedYear]);

  const fetchRevenueData = async () => {
    try {
      // Fetch monthly revenue for selected year
      const monthlyResponse = await axios.get(`http://localhost:5000/api/bills/monthly-revenue/${selectedYear}`);
      setMonthlyRevenue(monthlyResponse.data);

      // Fetch yearly revenue
      const yearlyResponse = await axios.get('http://localhost:5000/api/bills/yearly-revenue');
      setYearlyRevenue(yearlyResponse.data);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  return (
    <div className="analysis">
      <h2 className="text-2xl font-bold mb-6">Revenue Analysis</h2>
      
      <div className="mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {yearlyRevenue.map(year => (
            <option key={year.year} value={year.year}>{year.year}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue - {selectedYear}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#4CAF50" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Revenue Trend Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Yearly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={yearlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2196F3" 
                name="Revenue (₹)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;