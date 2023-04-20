package com.example.course_work.repository;

import com.example.course_work.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

import static com.example.course_work.repository.UserSpecification.hasUsername;

@Repository
public class UserRepository extends AbstractRepository<User, Long> {

    @Override
    @PostConstruct
    public void init() {
        setClazz(User.class);
    }

    public User findByUsername(String username) {
        return findOne(hasUsername(username));
    }
}
