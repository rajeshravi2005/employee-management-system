import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Employee Management</h2>
      <div>
        <button style={styles.button} onClick={() => navigate('/employees')}>Employees</button>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#34495e',
    color: '#fff'
  },
  logo: {
    margin: 0,
  },
  button: {
    marginRight: '10px',
    padding: '8px 12px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  logoutButton: {
    padding: '8px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Navbar;
