package com.example.server.web;


import com.example.server.dto.AuthResponseDTO;
import com.example.server.dto.RegisterDto;
import com.example.server.entities.UserEntity;
import com.example.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Controller
public class UserController {
    private AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;

    @PostMapping(path="/registration")
    public @ResponseBody String addNewUser (@Valid  @RequestBody RegisterDto registerDto){
        System.out.println("hello there partner ");
        userService.addUser(registerDto);
        return "user registered successfully";
    }
    @PostMapping(path="/login")
    public ResponseEntity<AuthResponseDTO> login (@RequestBody UserEntity user){
        System.out.println("hello there said ");
       return  userService.loginUser(user);

    }
    @GetMapping(path="/details")
   @ResponseBody public String getUserDetails (@RequestHeader("token")String token){
        System.out.println(token);
        String username= userService.getUsername(token);
    return username;
    }


}
