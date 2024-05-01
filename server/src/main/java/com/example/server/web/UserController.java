package com.example.server.web;

import com.example.server.entities.User;
import com.example.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@Controller
public class UserController {
    @Autowired
UserService userService;

    @PostMapping(path="/registration")
    public @ResponseBody String addNewUser (@RequestBody User user){
        userService.addUser(user);
        return "Saved";
    }

}
