package com.example.course_work;

import com.example.course_work.services.DogService;
import com.example.course_work.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value="/dogs")
public class DogController {
    private final DogService dogService;
    private final OrderService orderService;

    @Autowired
    private DogRepository dogRepository;
    private OrderRepository orderRepository;

    @Autowired
    public DogController(DogService dogDriver, OrderService orderService) {
        this.dogService = dogDriver;
        this.orderService = orderService;
    }

    @PostMapping(value="")
    public ResponseEntity<?> create(@RequestBody Dog dog){
        dogService.create(dog);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

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


    @GetMapping(value="/watch/{id}")
    public String watchDogById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("dogs", dogService.read(id));
        return "watch_dog.html";
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

    @Secured("ADMIN")
    @GetMapping(value="/admin/orders")
    public String showOrders(Model model){
        model.addAttribute("orders", orderService.readAll());
        return "show_orders.html";
    }

    @DeleteMapping(value="/{id}/remove")
    public ResponseEntity<?> delete(@PathVariable(name="id") long id) {
        final boolean deleted = dogService.delete(id);
        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PostMapping (value="/admin/orders/{id}/remove")
    public String DeleteOrder(Model model, @PathVariable(name="id") long id){
        Order order = orderService.read(id);
        OrderService.delete(order);
        return "redirect:/dogs/admin/orders/";
    }

    @GetMapping(value="/dog/{breed}")
    public ResponseEntity<List<Dog>> getDogsByCode(@PathVariable(name="breed") String breed) {
        final List<Dog> dogs = dogService.findDogsByBreed(breed);
        return dogs != null && !dogs.isEmpty()
                ? new ResponseEntity<>(dogs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Secured("ADMIN")
    @GetMapping("add_dogs")
    public String getDogCreatingPage(@ModelAttribute("dog") Dog dog) {
        return "add_dogs.html";
    }

    @Secured("ADMIN")
    @PostMapping(value = "add_dogs")
    public String CreateDog(@ModelAttribute("dog") Dog dog) {
        System.out.println("Dog created");
        return dogService.create(dog);
    }

}