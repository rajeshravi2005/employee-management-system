package com.ems.employee.controller;

import com.ems.employee.model.Employee;
import com.ems.employee.repository.EmployeeRepository;
import com.ems.employee.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Get employees for logged-in user
    @GetMapping
    public List<Employee> getAllEmployees(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.validateToken(token);
        return employeeRepository.findByUserEmail(email);
    }

    // Add employee for logged-in user
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.validateToken(token);
        employee.setUserEmail(email);
        return employeeRepository.save(employee);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable String id, @RequestBody Employee updated) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(updated.getName());
        employee.setEmail(updated.getEmail());
        employee.setPosition(updated.getPosition());
        employee.setSalary(updated.getSalary());
        employee.setDate(updated.getDate());

        return employeeRepository.save(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable String id) {
        employeeRepository.deleteById(id);
    }
}
