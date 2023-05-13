package com.example.course_work.repository;

import com.example.course_work.model.Dog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DogRepository extends JpaRepository<Dog, Long> {
    List<Dog> findAllByBreed(String breed);
    //Dog findById(long id);
}