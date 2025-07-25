import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    date: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first!');
      navigate('/');
      return;
    }

    if (!employee.name || !employee.email || !employee.position) {
      toast.warning('Name, Email, and Position are required!');
      return;
    }

    axios.post('http://localhost:8080/api/employees', employee, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('Employee added successfully!');
        navigate('/employees');
      })
      .catch((err) => {
        console.error('Error adding employee:', err);
        toast.error('Failed to add employee');
      });
  };

  return (
    <div style={styles.container}>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={employee.position}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={employee.date}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Employee</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
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
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default AddEmployee;
