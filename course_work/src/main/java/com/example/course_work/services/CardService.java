package com.example.course_work.services;

import com.example.course_work.Card;
import com.example.course_work.CardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class CardService {
    private CardRepository cardRepository;
    private EmailService emailService;

    @Autowired
    public CardService(CardRepository cardRepository, EmailService emailService) {
        this.cardRepository = cardRepository;
        this.emailService = emailService;
    }

    @Transactional
    public void create(Card card) {
        log.info("Create cards {}", card);
        cardRepository.save(card);
        emailService.sendNotification(card);
    }

    @Transactional
    public List<Card> readAll() {
        log.info("Read all cards");
        return cardRepository.findAll();
    }

    @Transactional
    public Card read(long id) {
        log.info("Read by id = {}", id);
        return cardRepository.getById(id);
    }

    @Transactional
    public boolean update(Card card, long id) {
        log.info("Update card by id = {}", id);
        card.setId(id);
        cardRepository.save(card);
        return true;
    }

    @Transactional
    public boolean delete(long id) {
        log.info("Delete card by id = {}", id);
        cardRepository.deleteById(id);
        return true;
    }

    @Transactional
    public List<Card> findCardsByCode(int code) {
        log.info("Find cards by code = {}", code);
        return cardRepository.findAllByCode(code);
    }
}
