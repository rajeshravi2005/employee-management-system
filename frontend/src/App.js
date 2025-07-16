// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // ✅ This applies your styles globally

import Login from './Login';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <EmployeeForm />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EmployeeForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {/* ✅ ToastContainer only ONCE at root level */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
