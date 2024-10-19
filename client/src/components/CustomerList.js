// client/src/components/CustomerList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from './CustomerForm';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleDelete = async (customerId) => {
    try {
      console.log(`Attempting to delete customer with ID: ${customerId}`); // Log the ID
      await axios.delete(`http://localhost:5000/api/customers/${customerId}`);
      fetchCustomers(); // Refresh the customer list after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <CustomerForm onCustomerAdded={fetchCustomers} editingCustomer={editingCustomer} setEditingCustomer={setEditingCustomer} />
      <ul>
        {filteredCustomers.map(customer => (
          <li key={customer._id} className="customer-item">
            <span>{customer.name}</span>
            <span>{customer.email}</span>
            <span>{customer.phone}</span>
            <button className="edit-btn" onClick={() => handleEdit(customer)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CustomerList;
