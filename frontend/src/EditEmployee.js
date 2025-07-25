import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
    date: ''
  });

  // Fetch employee details by ID
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first!');
      navigate('/');
      return;
    }

    axios
      .get(`http://localhost:8080/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error('Failed to load employee data:', error);
        toast.error('Failed to load employee data');
        navigate('/employees');
      });
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios
      .put(`http://localhost:8080/api/employees/${id}`, employee, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        toast.success('Employee updated successfully');
        navigate('/employees');
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        toast.error('Failed to update employee');
      });
  };

  return (
    <div style={styles.container}>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <input
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          placeholder="Position"
          style={styles.input}
        />
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Salary"
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={employee.date}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '30px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
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
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default EditEmployee;




