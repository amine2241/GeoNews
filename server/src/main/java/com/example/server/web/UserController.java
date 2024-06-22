package com.example.server.web;


import com.example.server.dto.NewsDto;
import com.example.server.dto.RegisterDto;
import com.example.server.entities.NewsEntity;
import com.example.server.entities.UserEntity;
import com.example.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Controller
public class UserController {
    private AuthenticationManager authenticationManager;
    @Autowired
    UserService userService;

    @PostMapping(path="/registration")
    public @ResponseBody ResponseEntity  addNewUser (@Valid  @RequestBody RegisterDto registerDto){
        System.out.println("hello there partner ");
        if(userService.UsernameUnique(registerDto)){
            userService.addUser(registerDto);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User registered successfully");
        }else {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Username already exists");
        }
    }
    @PostMapping(path="/login")
    public ResponseEntity<?> login (@RequestBody UserEntity user){
       return  userService.loginUser(user);

    }
    @GetMapping(path="/details")
    @ResponseBody public String getUserDetails (@RequestHeader("token")String token){
        System.out.println(token);
        String username= userService.getUsername(token);
        return username;
    }
    @GetMapping(path="/pinnednews")
    @ResponseBody public ResponseEntity getPinnedNews (@RequestHeader("token")String token){
        System.out.println(token);
        String username= userService.getUsername(token);
        List<NewsEntity> listNews = userService.getListNews(username);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(listNews);
    }
    @PostMapping(path="/unpin")
    public @ResponseBody ResponseEntity UnpinNews (@Valid @RequestBody NewsDto newsDto, @RequestHeader("token")String token){
        System.out.println("news unpin");
        System.out.println(token);
        String username= userService.getUsername(token);
        userService.RemoveNewsFromList(newsDto.getTitle(),username);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newsDto);
    }


}
