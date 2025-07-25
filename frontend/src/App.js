import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './Navbar';
import Login from './Login';
import EmployeeList from './EmployeeList';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import Register from './Register';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

// This is the main entry point for the application
// It sets up the routing and main components of the app
export default App;


