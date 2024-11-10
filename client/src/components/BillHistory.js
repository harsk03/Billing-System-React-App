import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

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
      // Filter out invalid records during initial data setup
      const validBills = response.data.filter(bill => 
        bill &&
        bill.invoiceNumber && 
        bill.total !== undefined &&
        bill.date &&
        bill.cashierInfo
      );
      setBills(validBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setBills([]);
    }
  };

  const filterBills = () => {
    return bills.filter(bill => {
      const searchTermLower = searchTerm.toLowerCase();
      
      switch (filterType) {
        case 'invoice':
          return bill.invoiceNumber?.toString().toLowerCase().includes(searchTermLower);
        
        case 'month':
          try {
            const date = new Date(bill.date);
            if (isNaN(date.getTime())) return false; // Invalid date check
            const billMonth = date.toLocaleString('default', { month: 'long' });
            return billMonth.toLowerCase().includes(searchTermLower);
          } catch {
            return false;
          }
        
        case 'year':
          try {
            const date = new Date(bill.date);
            if (isNaN(date.getTime())) return false; // Invalid date check
            const billYear = date.getFullYear().toString();
            return billYear.includes(searchTerm);
          } catch {
            return false;
          }
        
        default:
          return false;
      }
    });
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid
      return date.toLocaleDateString('en-IN');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString);
      if (isNaN(date.getTime())) return timeString; // Return original if invalid
      return date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
    } catch {
      return timeString;
    }
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
          <option value="month">Search by Month (name)</option>
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
            {filterBills().map((bill) => (
              <tr key={bill.invoiceNumber} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{bill.invoiceNumber}</td>
                <td className="border px-4 py-2">{bill.cashierInfo}</td>
                <td className="border px-4 py-2">₹{bill.total?.toFixed(2) ?? '0.00'}</td>
                <td className="border px-4 py-2">{formatDate(bill.date)}</td>
                <td className="border px-4 py-2">{formatTime(bill.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillHistory;