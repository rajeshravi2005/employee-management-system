import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');   // Clear token
    navigate('/');                      // Redirect to login
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Login</Link></li>
        <li><Link to="/employees">Employee List</Link></li>
        <li><Link to="/add">Add Employee</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;


