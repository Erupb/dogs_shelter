package com.example.course_work;

import com.example.course_work.auth.ApplicationUserService;
import com.example.course_work.auth.UserRepository;
import com.example.course_work.services.DogService;
import com.example.course_work.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/dogs")
public class DogController {
    private final DogService dogService;
    private final OrderService orderService;

    @Autowired
    private DogRepository dogRepository;
    private OrderRepository orderRepository;
    private UserRepository userRepository;
    private ApplicationUserService applicationUserService;

    @Autowired
    public DogController(DogService dogDriver, OrderService orderService, UserRepository userRepository, ApplicationUserService applicationUserService) {
        this.dogService = dogDriver;
        this.orderService = orderService;
        this.userRepository = userRepository;
        this.applicationUserService = applicationUserService;
    }

    @PostMapping(value="")
    public ResponseEntity<?> create(@RequestBody Dog dog){
        dogService.create(dog);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /*@GetMapping("")
    public String showDogs(Model model){
        model.addAttribute("dogs", dogService.readAll());
        return "show_dogs.html";
    }*/
    @GetMapping("")
    public List<Dog> showDogs(Model model){
        //model.addAttribute("dogs", dogService.readAll());
        return dogService.readAll();
        //return "show_dogs.html";
    }

    /*@Secured("ADMIN")
    @GetMapping(value="/admin/{id}")
    public String showDogById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("dogs", dogService.read(id));
        return "show_by_id.html";
    }*/
    @Secured("ADMIN")
    @GetMapping(value="/admin/{id}")
    public Dog showDogById(@PathVariable(name="id") long id){
        return dogService.read(id);
    }

    @PostMapping (value="/admin/{id}/remove")
    public String DeleteDog(Model model, @PathVariable(name="id") long id){
        Dog dog = dogService.read(id);
        DogService.delete(dog);
        return "redirect:/dogs";
    }

    //On take_dog page we will just find dog by id from method showDogById and print this info on page with button "Send order" or smth like this
    /*@GetMapping(value="/get/{id}")
    public String getDogById(Model model, @PathVariable(name="id") long id){
        model.addAttribute("dogs", dogService.read(id));
        return "take_dog.html";
    }*/

    @PostMapping(value = "/get/{id}/home")
    public String CreateOrder(@ModelAttribute("order") Order order, @PathVariable(name="id") long id) {
        order.setDog_id((int) id);
        order.setUser_id(userRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId());
        orderService.create(order);
        //System.out.println(dogService.read(id));
        //System.out.println(dogRepository.getById(id));
        //dogService.read(id).setOrdered(true);
        dogService.updateDogOrdered(id);
        return "show_dogs.html";
    }

    /*@Secured("ADMIN")
    @GetMapping(value="/admin/orders")
    public String showOrders(Model model){
        model.addAttribute("orders", orderService.readAll());
        return "show_orders.html";
    }*/
    @Secured("ADMIN")
    @GetMapping(value="/admin/orders")
    public List<Order> showOrders(){
        return orderService.readAll();
    }

    @DeleteMapping(value="/{id}/remove")
    public ResponseEntity<?> delete(@PathVariable(name="id") long id) {
        final boolean deleted = dogService.delete(id);
        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @PostMapping (value="/admin/orders/{orderid}/remove/{dogid}")
    public String DeleteOrder(Model model, @PathVariable(name="orderid") long orderid, @PathVariable(name="dogid") long dogid){
        Order order = orderService.read(orderid);
        OrderService.delete(order);
        Dog dog = dogService.read(dogid);
        DogService.delete(dog);
        return "redirect:/dogs/admin/orders/";
    }

    //Not used
    /*@GetMapping(value="/dog/{breed}")
    public ResponseEntity<List<Dog>> getDogsByCode(@PathVariable(name="breed") String breed) {
        final List<Dog> dogs = dogService.findDogsByBreed(breed);
        return dogs != null && !dogs.isEmpty()
                ? new ResponseEntity<>(dogs, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }*/

    //This page will occur on react. We don`t need data from this method so we can comment it
    /*@Secured("ADMIN")
    @GetMapping("add_dogs")
    public String getDogCreatingPage(@ModelAttribute("dog") Dog dog) {
        return "add_dogs.html";
    }*/

    @Secured("ADMIN")
    @PostMapping(value = "add_dogs")
    public String CreateDog(@ModelAttribute("dog") Dog dog) {
        System.out.println("Dog created");
        return dogService.create(dog);
    }

}