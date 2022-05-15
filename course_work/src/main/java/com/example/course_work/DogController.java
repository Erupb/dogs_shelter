package com.example.course_work;

import com.example.course_work.auth.User;
import com.example.course_work.services.DogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value="/dogs")
public class DogController {
    private final DogService dogService;

    @Autowired
    public DogController(DogService dogDriver) {
        this.dogService = dogDriver;
    }

    @PostMapping(value="")
    public ResponseEntity<?> create(@RequestBody Dog dog){
        dogService.create(dog);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /*
    @GetMapping(value="")
    public ResponseEntity<List<Dog>> read(Map<String, Object> model) {
        final List<Dog> dogs = dogService.readAll();

        model.put("dogs", dogs);

        return dogs != null && !dogs.isEmpty()
                ? new ResponseEntity<>(dogs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

     */
    @GetMapping("")
    public String showDogs(Model model){
        model.addAttribute("dogs", dogService.readAll());
        return "show_dogs.html";
    }

    @Secured("ADMIN")
    @GetMapping(value="/admin/{id}")
    public String showDogById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("dogs", dogService.read(id));
        return "show_by_id.html";
    }

    @PostMapping (value="/admin/{id}/remove")
    public String DeleteDog(Model model, @PathVariable(name="id") long id){
        Dog dog = dogService.read(id);
        DogService.delete(dog);
        return "redirect:/dogs";
    }

    @GetMapping(value="/get/{id}")
    public String getDogById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("dogs", dogService.read(id));
        return "take_dog.html";
    }

    @PostMapping (value="/get/{id}/home")
    public String GetDog(Model model, @PathVariable(name="id") long id){
        Dog dog = dogService.read(id);
        DogService.delete(dog);
        return "show_dogs.html";
    }



    /*
    @GetMapping(value="/{id}")
    public ResponseEntity<Dog> read(@PathVariable(name="id") long id) {
        final Dog dog = dogService.read(id);
        return dog != null
                ? new ResponseEntity<>(dog, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

     */

    @PutMapping(value="/{id}")
    public ResponseEntity<?> update(@PathVariable(name="id") long id, @RequestBody Dog dog) {
        final boolean updated = dogService.update(dog, id);
        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value="/{id}/remove")
    public ResponseEntity<?> delete(@PathVariable(name="id") long id) {
        final boolean deleted = dogService.delete(id);
        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @GetMapping(value="/dog/{breed}")
    public ResponseEntity<List<Dog>> getDogsByCode(@PathVariable(name="breed") String breed) {
        final List<Dog> dogs = dogService.findDogsByBreed(breed);
        return dogs != null && !dogs.isEmpty()
                ? new ResponseEntity<>(dogs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @Secured("ADMIN")
    @GetMapping("add_dogs")
    public String getDogCreatingPage(@ModelAttribute("dog") Dog dog) {
        return "add_dogs.html";
    }

    //@PreAuthorize("hasAuthority('ADMIN')")
    @Secured("ADMIN")
    @PostMapping(value = "add_dogs")
    public String CreateDog(@ModelAttribute("dog") Dog dog) {
        System.out.println("Dog created");
        return dogService.create(dog);
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
