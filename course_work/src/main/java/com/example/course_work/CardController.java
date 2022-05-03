package com.example.course_work;

import com.example.course_work.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/cards")
public class CardController {
    private final CardService cardService;

    @Autowired
    public CardController(CardService cardDriver) {
        this.cardService = cardDriver;
    }

    @PostMapping(value="")
    public ResponseEntity<?> create(@RequestBody Card card){
        cardService.create(card);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value="")
    public ResponseEntity<List<Card>> read() {
        final List<Card> cards = cardService.readAll();
        return cards != null && !cards.isEmpty()
                ? new ResponseEntity<>(cards, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Card> read(@PathVariable(name="id") long id) {
        final Card card = cardService.read(id);
        return card != null
                ? new ResponseEntity<>(card, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<?> update(@PathVariable(name="id") long id, @RequestBody Card card) {
        final boolean updated = cardService.update(card, id);
        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value="/{id}")
    public ResponseEntity<?> delete(@PathVariable(name="id") long id) {
        final boolean deleted = cardService.delete(id);
        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @GetMapping(value="/code/{code}")
    public ResponseEntity<List<Card>> getCardsByCode(@PathVariable(name="code") int code) {
        final List<Card> codes = cardService.findCardsByCode(code);
        return codes != null && !codes.isEmpty()
                ? new ResponseEntity<>(codes, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}

/*import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/cards")
public class CardController {
    private final CardDriver driver;

    @Autowired
    public CardController(CardDriver driver) {
        this.driver = driver;
    }


    @GetMapping(value="")
    public ResponseEntity<List<Card>> read() {
        final List<Card> phones = driver.readAll();
        return phones != null && !phones.isEmpty()
                ? new ResponseEntity<>(phones, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Card> read(@PathVariable(name="id") long id) {
        final Card phone = driver.read(id);
        return phone != null
                ? new ResponseEntity<>(phone, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value="/code/{code}")
    public ResponseEntity<List<Card>> findCardsByCode(@PathVariable(name="code") int code) {
        final List<Card> cards = driver.findCardsByCode(code);
        return cards != null && !cards.isEmpty()
                ? new ResponseEntity<>(cards, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}*/
