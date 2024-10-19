// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import BillInvoice from './components/BillInvoice';
import Cashiers from './components/Cashiers';
import RestaurantInfo from './components/RestaurantInfo';

import './styles.css';
import './billStyles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/cashiers" element={<Cashiers />} />
          <Route path="/bill" element={<BillInvoice />} />
          <Route path="/restaurant-info" element={<RestaurantInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;