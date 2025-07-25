import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first!');
      navigate('/');
      return;
    }

    axios.get('http://localhost:8080/api/employees', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => setEmployees(response.data))
      .catch((error) => {
        console.error('Error fetching employees:', error);
        toast.error('Failed to load employees.');
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Employee deleted successfully');
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Failed to delete employee');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee List</h2>
      <button style={styles.addButton} onClick={() => navigate('/add')}>Add Employee</button>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Position</th>
                <th style={styles.th}>Salary</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id || emp.id}>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>{emp.position}</td>
                  <td style={styles.td}>{emp.salary}</td>
                  <td style={styles.td}>{emp.date}</td>
                  <td style={styles.td}>
                    <button style={styles.editButton} onClick={() => navigate(`/edit/${emp._id || emp.id}`)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => handleDelete(emp._id || emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  addButton: {
    marginBottom: '10px',
    padding: '8px 12px',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f2f2f2'
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px'
  },
  editButton: {
    marginRight: '8px',
    padding: '5px 10px',
    backgroundColor: '#0f6df1ff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#e21111ff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  }
};

export default EmployeeList;





