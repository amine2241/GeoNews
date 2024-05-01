package com.example.server.web;

import com.example.server.entities.User;
import com.example.server.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class UserController {
UserService userService;
    @PostMapping(path="/add")
    User editProductByPrice(@RequestParam String firstName,
                            @RequestParam String  lastName,
                            @RequestParam String  email,
                            @RequestParam String password){
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setEmail(password);
        return userService.addUser(user);
    }

}
