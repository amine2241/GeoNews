package com.example.server.web;



import com.example.server.dto.AddNewsDto;
import com.example.server.dto.LatLngDto;
import com.example.server.entities.NewsEntity;
import com.example.server.entities.Role;
import com.example.server.entities.UserEntity;
import com.example.server.service.NewsService;
import com.example.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.server.repositories.UserRepo;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
@Controller
public class NewsController {

    @Autowired
    NewsService newsService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepo userrepo;

    @PostMapping(path="/pin")
    public @ResponseBody ResponseEntity CreateAndPinNews (@Valid @RequestBody AddNewsDto addnewsdto,@RequestHeader("token")String token){
        System.out.println("news control");
        String username= userService.getUsername(token);
        UserEntity user = userrepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
        newsService.create(addnewsdto,user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(addnewsdto);
    }

    @PostMapping(path="/creatednews")
    public @ResponseBody ResponseEntity GetUserCreatedNews (@Valid @RequestBody LatLngDto latlngdto){
        System.out.println("userCreatedNews control");
        Float Lat = Float.parseFloat(latlngdto.getLat());
        Float Lng = Float.parseFloat(latlngdto.getLng());
        List<NewsEntity> listCreatedNews = newsService.getUserCreatedNews(Lat,Lng);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(listCreatedNews);
    }




}
