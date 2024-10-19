import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cashiers() {
  const [cashiers, setCashiers] = useState([]);
  const [newCashier, setNewCashier] = useState({ name: '', experience: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', experience: '', email: '', phone: '' });

  useEffect(() => {
    fetchCashiers();
  }, []);

  const fetchCashiers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cashiers');
      setCashiers(response.data);
    } catch (error) {
      console.error('Error fetching cashiers:', error);
    }
  };

  const handleNewCashierChange = (e) => {
    const { name, value } = e.target;
    setNewCashier({ ...newCashier, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (/\d/.test(value)) {
          errorMessage = 'Name should not contain numbers';
        }
        break;
      case 'experience':
        if (parseInt(value) === 0) {
          errorMessage = 'Experience should not be 0';
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      validateField(e.target.name, e.target.value);
    }
  };

  const addCashier = async () => {
    if (Object.values(errors).some(error => error !== '')) {
      alert('Please correct the errors before submitting');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/cashiers', newCashier);
      setNewCashier({ name: '', experience: '', email: '', phone: '' });
      setErrors({ name: '', experience: '', email: '', phone: '' });
      fetchCashiers();
    } catch (error) {
      console.error('Error adding cashier:', error);
    }
  };

  const editCashier = async (cashier) => {
    try {
      await axios.put(`http://localhost:5000/api/cashiers/${cashier._id}`, cashier);
      fetchCashiers();
    } catch (error) {
      console.error('Error editing cashier:', error);
    }
  };

  const deleteCashier = async (cashierId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cashiers/${cashierId}`);
      fetchCashiers();
    } catch (error) {
      console.error('Error deleting cashier:', error);
    }
  };

  return (
    <div className="cashiers-container">
      <h2>Cashiers</h2>
      <div className="new-cashier">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newCashier.name}
            onChange={handleNewCashierChange}
            onKeyDown={handleKeyDown}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div>
          <input
            type="number"
            name="experience"
            placeholder="Experience (years)"
            value={newCashier.experience}
            onChange={handleNewCashierChange}
            onKeyDown={handleKeyDown}
          />
          {errors.experience && <div className="error-message">{errors.experience}</div>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCashier.email}
            onChange={handleNewCashierChange}
            onKeyDown={handleKeyDown}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={newCashier.phone}
            onChange={handleNewCashierChange}
            onKeyDown={handleKeyDown}
          />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>
        <button onClick={addCashier} class="submit-btn">Add Cashier</button>
      </div>
      <table className="cashiers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cashiers.map((cashier) => (
            <tr key={cashier._id}>
              <td>
                <input
                  type="text"
                  value={cashier.name}
                  onChange={(e) => editCashier({ ...cashier, name: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={cashier.experience}
                  onChange={(e) => editCashier({ ...cashier, experience: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={cashier.email}
                  onChange={(e) => editCashier({ ...cashier, email: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="tel"
                  value={cashier.phone}
                  onChange={(e) => editCashier({ ...cashier, phone: e.target.value })}
                />
              </td>
              <td>
                <button class="edit-btn" onClick={() => editCashier(cashier)}>Save</button>
                <button class="delete-btn" onClick={() => deleteCashier(cashier._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .error-message {
          color: red;
          font-size: 0.8rem;
          margin-top: 0.2rem;
        }
      `}</style>
    </div>
  );
}

export default Cashiers;