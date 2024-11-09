import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaHistory, FaChartLine } from 'react-icons/fa';

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
  const userRole = localStorage.getItem('userType');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setShowLogoutModal(false);
    navigate('/auth');
  };

  // Define navigation items with role-based access
  const navItems = [
    { path: '/', label: 'Home', allowedRoles: ['admin', 'cashier'] },
    { path: '/customers', label: 'Customers', allowedRoles: ['admin'] },
    { path: '/cashiers', label: 'Cashiers', allowedRoles: ['admin'] },
    { path: '/bill', label: 'Create Bill', allowedRoles: ['admin', 'cashier'] },
    { path: '/bill-history', label: 'Bill History', icon: <FaHistory />, allowedRoles: ['admin'] },
    { path: '/analysis', label: 'Analysis', icon: <FaChartLine />, allowedRoles: ['admin'] },
    { path: '/restaurant-info', label: 'Restaurant Info', allowedRoles: ['admin', 'cashier'] }
  ];

  return (
    <>
      <nav className="navbar flex items-center justify-between p-4 bg-white shadow-md">
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            item.allowedRoles.includes(userRole) && (
              <li key={index}>
                <Link to={item.path} className="nav-link">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              </li>
            )
          ))}
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

        .nav-link {
          display: flex;
          align-items: center;
          color: #333;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #4CAF50;
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

        /* ... rest of the styles remain the same ... */
      `}</style>
    </>
  );
}

export default Navbar;