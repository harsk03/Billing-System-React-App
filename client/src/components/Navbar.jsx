import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button 
            className="modal-cancel"
            onClick={onClose}
          >
            No, Cancel
          </button>
          <button 
            className="modal-submit"
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setShowLogoutModal(false);
    navigate('/auth');
  };

  return (
    <>
      <nav className="navbar flex items-center justify-between p-4 bg-white shadow-md">
        <ul className="flex items-center gap-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/customers">Customers</Link></li>
          <li><Link to="/cashiers">Cashiers</Link></li>
          <li><Link to="/bill">Create Bill</Link></li>
          <li><Link to="/restaurant-info">Restaurant Info</Link></li>
        </ul>

        <button 
          className="logout-button"
          onClick={() => setShowLogoutModal(true)}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </nav>

      {showLogoutModal && (
        <LogoutModal 
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}

      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 2rem;
        }

        .navbar ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .logout-button {
          display: flex;
          align-items: center;
          background-color: #4CAF50;
          color: white;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          transition: background-color 0.2s ease;
        }

        .logout-button:hover {
          background-color: #f44336;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .modal-submit,
        .modal-cancel {
          padding: 0.5rem 1.5rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .modal-submit {
          background-color: #4CAF50;
          color: white;
        }

        .modal-submit:hover {
          background-color: #45a049;
        }

        .modal-cancel {
          background-color: #f44336;
          color: white;
        }

        .modal-cancel:hover {
          background-color: #da190b;
        }
      `}</style>
    </>
  );
}

export default Navbar;