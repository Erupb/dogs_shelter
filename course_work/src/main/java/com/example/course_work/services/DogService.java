package com.example.course_work.services;

import com.example.course_work.Dog;
import com.example.course_work.DogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class DogService {
    private static DogRepository dogRepository;
    private EmailService emailService;

    @Autowired
    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
        //this.emailService = emailService;
    }

    public static void delete(Dog dog) {
        log.info("Delete dog by id = {}", dog);
        dogRepository.delete(dog);
    }

    @Transactional
    public String create(Dog dog) {
        log.info("Create dogs {}", dog);
        dogRepository.save(dog);
        //emailService.sendNotification(dog);
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
    public boolean update(Dog dog, long id) {
        log.info("Update dog by id = {}", id);
        dog.setId(id);
        dogRepository.save(dog);
        return true;
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
