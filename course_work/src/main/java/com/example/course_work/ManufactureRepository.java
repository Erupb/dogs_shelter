package com.example.course_work;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManufactureRepository extends JpaRepository<Manufacture, Long> {

    /*List<Manufacture> findAllByCardNumber(int card_number);*/
    List<Manufacture> findAllByCode(int code);
}