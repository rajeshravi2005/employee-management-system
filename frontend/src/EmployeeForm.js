import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode

  // Fetch employee details if editing
  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setName(res.data.name);
        setEmail(res.data.email);
        setPosition(res.data.position);
        setSalary(res.data.salary || '');
      } catch (err) {
        console.error('❌ Failed to fetch employee:', err);
        toast.error('Failed to load employee data');
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // 🛑 Validate all fields
    if (!name || !email || !position || !salary) {
      toast.error("❌ Please fill in all fields");
      return;
    }

    console.log("🔍 Submitting:", { name, email, position, salary });

    try {
      if (id) {
        // Edit
        await axios.put(`http://localhost:5000/api/employees/${id}`, {
          name,
          email,
          position,
          salary
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('✅ Employee updated');
      } else {
        // Add
        await axios.post('http://localhost:5000/api/employees', {
          name,
          email,
          position,
          salary
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('✅ Employee added');
      }

      // Redirect after short delay
      setTimeout(() => {
        navigate('/employees');
      }, 1500);
    } catch (err) {
      console.error('❌ Submit error:', err);
      toast.error('❌ Error: ' + (err.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Position:</label><br />
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
        </div>
        <div>
          <label>Salary:</label><br />
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'} Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
