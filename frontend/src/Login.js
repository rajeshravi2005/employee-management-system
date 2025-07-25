import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.warning('Email and password are required!');
      return;
    }

    axios.post('http://localhost:8080/api/auth/login', credentials)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
          navigate('/employees'); // Redirect to Employee List
        } else {
          toast.error('Invalid response from server.');
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
        toast.error('Invalid credentials or server error.');
      });
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')} style={styles.linkButton}>
          Register
        </button>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  linkButton: {
    background: 'none',
    color: '#3498db',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0
  }
};

export default Login;





