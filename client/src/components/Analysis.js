import React, { useState, useEffect } from 'react';
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Sample data remained the same
const SAMPLE_MONTHLY_DATA = [
  { month: 'January', revenue: 45000 },
  { month: 'February', revenue: 52000 },
  { month: 'March', revenue: 48000 },
  { month: 'April', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'June', revenue: 67000 },
  { month: 'July', revenue: 72000 },
  { month: 'August', revenue: 69000 },
  { month: 'September', revenue: 59000 },
  { month: 'October', revenue: 63000 },
  { month: 'November', revenue: 58000 },
  { month: 'December', revenue: 74000 }
];

const SAMPLE_YEARLY_DATA = [
  { year: 2020, revenue: 580000 },
  { year: 2021, revenue: 650000 },
  { year: 2022, revenue: 720000 },
  { year: 2023, revenue: 790000 },
  { year: 2024, revenue: 723000 }
];

const SAMPLE_CASHIER_DATA = [
  { cashierName: 'John', totalBills: 450 },
  { cashierName: 'Sarah', totalBills: 380 },
  { cashierName: 'Mike', totalBills: 320 },
  { cashierName: 'Emma', totalBills: 290 },
  { cashierName: 'David', totalBills: 260 }
];

const Analysis = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(SAMPLE_MONTHLY_DATA);
  const [cashierStats, setCashierStats] = useState(SAMPLE_CASHIER_DATA);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterDataByYear = () => {
      setLoading(true);
      try {
        setMonthlyRevenue(SAMPLE_MONTHLY_DATA);
        setCashierStats(SAMPLE_CASHIER_DATA);
      } catch (error) {
        setError('Error processing data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    filterDataByYear();
  }, [selectedYear]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Revenue Analysis</h1>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm"
          >
            {SAMPLE_YEARLY_DATA.map(item => (
              <option key={item.year} value={item.year}>
                {item.year}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue - {selectedYear}</h2>
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer>
                <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cashier Distribution Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Cashier Bill Distribution</h2>
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={cashierStats}
                    dataKey="totalBills"
                    nameKey="cashierName"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({name, percent}) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {cashierStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yearly Trend Line Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Yearly Revenue Trend</h2>
            <div style={{ width: '100%', height: '400px' }}>
              <ResponsiveContainer>
                <LineChart data={SAMPLE_YEARLY_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `₹${value/100000}L`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;