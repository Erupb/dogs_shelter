package com.example.course_work.service;

import com.example.course_work.dto.IUserDTO;
import com.example.course_work.exception.PasswordCheckException;
import com.example.course_work.model.Dog;
import com.example.course_work.DogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class DogService {
    private static DogRepository dogRepository;

    @Autowired
    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public static void delete(Dog dog) {
        log.info("Delete dog by id = {}", dog);
        dogRepository.delete(dog);
    }

    @Transactional
    public String create(Dog dog) {
        log.info("Create dogs {}", dog);
        dogRepository.save(dog);
        return "add_dogs";
    }

    @Transactional
    public List<Dog> readAll() {
        log.info("Read all dogs");
        return dogRepository.findAll();
    }

    @Transactional
    public Dog read(long id) {
        log.info("Read by id = {}", id);
        return dogRepository.getById(id);
    }

    @Transactional
    public void updateDogDescription(String description, Long id) {
        log.info("Update dog by id");
        Dog dog = dogRepository.getById(id);
        dog.setDescription(description);
        dogRepository.save(dog);
    }

    @Transactional
    public void updateDogOrdered(Long id) {
        log.info("Update dog by id");
        Dog dog = dogRepository.getById(id);
        dog.setOrdered(true);
        dogRepository.save(dog);
    }

    @Transactional
    public boolean delete(long id) {
        log.info("Delete dog by id = {}", id);
        dogRepository.deleteById(id);
        return true;
    }

    @Transactional
    public List<Dog> findDogsByBreed(String breed) {
        log.info("Find dogs by breed = {}", breed);
        return dogRepository.findAllByBreed(breed);
    }
}
