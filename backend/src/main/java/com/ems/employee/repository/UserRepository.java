package com.ems.employee.repository;

import java.util.Optional;

import com.ems.employee.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

}
