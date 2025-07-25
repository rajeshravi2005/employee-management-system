package com.ems.employee.repository;

import java.util.List;

import com.ems.employee.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

    List<Employee> findByUserEmail(String userEmail);

}
