const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const verifyToken = require('../middleware/auth');

// GET all employees (only for the logged-in user)
router.get('/', verifyToken, async (req, res) => {
  try {
    const employees = await Employee.find({ userId: req.user.id }); // ✅ Filter by user
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// POST a new employee
router.post('/', verifyToken, async (req, res) => {
  const { name, email, position, salary } = req.body;

  try {
    const newEmployee = new Employee({
      name,
      email,
      position,
      salary,
      userId: req.user.id, // ✅ Associate with logged-in user
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

// PUT - Update employee by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

// GET single employee by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // ✅ Prevent access to other users' employees
    if (employee.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// DELETE - Delete employee by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // ✅ Prevent deletion of other users' data
    if (employee.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;


