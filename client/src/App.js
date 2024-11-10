import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import BillInvoice from './components/BillInvoice';
import BillHistory from './components/BillHistory';
import Analysis from './components/Analysis';
import Cashiers from './components/Cashiers';
import RestaurantInfo from './components/RestaurantInfo';
import UserTypeSelection from './components/UserTypeSelection';
import AuthPage from './components/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import './styles.css';
import './billStyles.css';
import './auth.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header-container">
          <div className="company-branding">
            <img src="/Logo-icon.png" alt="ChillBill Logo" />
            <span>ChillBill</span>
          </div>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<UserTypeSelection />} />
            <Route path="/auth/:userType" element={<AuthPage />} />
           
            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<><Navbar /><Home /></>} />
              <Route path="/customers" element={<><Navbar /><CustomerList /></>} />
              <Route path="/cashiers" element={<><Navbar /><Cashiers /></>} />
              <Route path="/bill" element={<><Navbar /><BillInvoice /></>} />
              <Route path="/bill-history" element={<><Navbar /><BillHistory /></>} />
              <Route path="/analysis" element={<><Navbar /><Analysis /></>} />
              <Route path="/restaurant-info" element={<><Navbar /><RestaurantInfo /></>} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;