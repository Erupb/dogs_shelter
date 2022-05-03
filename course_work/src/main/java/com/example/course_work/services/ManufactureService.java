package com.example.course_work.services;

import com.example.course_work.Manufacture;
import com.example.course_work.ManufactureRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ManufactureService {
    private ManufactureRepository manufactureRepository;
    private EmailService emailService;

    @Autowired
    public ManufactureService(ManufactureRepository manufactureRepository, EmailService emailService) {
        this.manufactureRepository = manufactureRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void create(Manufacture manufacture) {
        log.info("Save manufacture");
        manufactureRepository.save(manufacture);
        emailService.sendNotification(manufacture);
    }

    @Transactional
    public List<Manufacture> readAll() {
        log.info("Read all manufactures");
        return manufactureRepository.findAll();
    }

    @Transactional
    public Manufacture read(long id) {
        log.info("Read manufacture by id = {}", id);
        return manufactureRepository.getById(id);
    }

    @Transactional
    public boolean update(Manufacture manufacture, long id) {
        log.info("Update manufacture with id = {}", id);
        manufacture.setId(id);
        manufactureRepository.save(manufacture);
        return true;
    }

    @Transactional
    public boolean delete(long id) {
        log.info("Delete manufacture by id = {}", id);
        manufactureRepository.deleteById(id);
        return true;
    }

    @Transactional
    public List<Manufacture> findManufacturesByCode(int code) {
        log.info("Find manufactures by code = {}", code);
        return manufactureRepository.findAllByCode(code);
    }

}