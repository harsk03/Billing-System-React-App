import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

import '../styles.css';

const BillHistory = () => {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('invoice');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bills/history');
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setBills([]); // Set empty array on error
    }
  };

  const filterBills = () => {
    return bills.filter(bill => {
      if (!bill) return false;
      
      const searchTermLower = searchTerm.toLowerCase();
      
      switch (filterType) {
        case 'invoice':
          return bill.invoiceNumber?.toString().toLowerCase().includes(searchTermLower);
        
        case 'month':
          try {
            const billMonth = new Date(bill.date).toLocaleString('default', { month: 'long' });
            return billMonth.toLowerCase().includes(searchTermLower);
          } catch {
            return false;
          }
        
        case 'year':
          try {
            const billYear = new Date(bill.date).getFullYear().toString();
            return billYear.includes(searchTerm);
          } catch {
            return false;
          }
        
        default:
          return true;
      }
    });
  };

  return (
    <div className="bill-history">
      <h2 className="text-2xl font-bold mb-6">Bill History</h2>
      
      <div className="flex gap-4 mb-6">
        <div className="flex items-center flex-1 max-w-md">
          <FaSearch className="text-gray-400 -mr-8 z-10" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-full"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="invoice">Search by Invoice</option>
          <option value="month">Search by Month</option>
          <option value="year">Search by Year</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Invoice No.</th>
              <th className="border px-4 py-2">Cashier</th>
              <th className="border px-4 py-2">Net Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {filterBills().map((bill, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{bill.invoiceNumber}</td>
                <td className="border px-4 py-2">{bill.cashierInfo}</td>
                <td className="border px-4 py-2">₹{bill.total?.toFixed(2) ?? '0.00'}</td>
                <td className="border px-4 py-2">{bill.date}</td>
                <td className="border px-4 py-2">{bill.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillHistory;