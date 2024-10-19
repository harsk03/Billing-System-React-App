import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm({ onCustomerAdded }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '' });

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (/\d/.test(value)) {
          errorMessage = 'Name should not contain numbers';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          errorMessage = 'Phone number should be 10 digits';
        } else if (value === '0000000000') {
          errorMessage = 'Invalid phone number';
        } else if (value.startsWith('0')) {
          errorMessage = 'Phone number should not start with 0';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      validateField(e.target.name, e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error !== '')) {
      alert('Please correct the errors before submitting');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/customers', formData);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({ name: '', email: '', phone: '' });
      onCustomerAdded();
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Name"
          required
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Email"
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Phone"
          required
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>
      <button type="submit" className="submit-btn">Add Customer</button>
      <style jsx>{`
        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
      `}</style>
    </form>
  );
}

export default CustomerForm;