package com.example.course_work.repository;

import org.springframework.data.jpa.domain.Specification;
import com.example.course_work.model.User;

public class UserSpecification {

    public static Specification<User> hasUsername(String username) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("username"), username);
    }
}