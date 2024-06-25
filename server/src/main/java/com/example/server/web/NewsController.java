package com.example.server.web;



import com.example.server.dto.NewsDto;
import com.example.server.dto.GetAddedDto;
import com.example.server.dto.UserCreateNewsDto;
import com.example.server.entities.NewsEntity;
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

import java.io.UnsupportedEncodingException;
import java.sql.Date;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

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
    public @ResponseBody ResponseEntity CreateAndPinNews (@Valid @RequestBody NewsDto newsDto, @RequestHeader("token")String token){
        System.out.println("news control");
        String username= userService.getUsername(token);
        UserEntity user = userrepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
        newsService.create(newsDto,user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newsDto);
    }
    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity AddNews (@Valid @RequestBody UserCreateNewsDto userCreateNewsDto, @RequestHeader("token")String token){
        try {

            byte[] name = Base64.getEncoder().encode(userCreateNewsDto.getPic().getBytes());
            byte[] decodedString = Base64.getDecoder().decode(new String(name).getBytes("UTF-8"));
            System.out.println(new String(decodedString));
        }catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String username= userService.getUsername(token);
        System.out.println(token);
        UserEntity user = userrepo.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
        newsService.addUserNews(userCreateNewsDto,user);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(userCreateNewsDto);
    }
    public String decode_image (byte[] image){
        try {
            byte[] decodedString = Base64.getDecoder().decode(new String(image).getBytes("UTF-8"));
            return new String(decodedString);
        }catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
        }

    }

    @PostMapping(path="/creatednews")
    public @ResponseBody ResponseEntity GetUserCreatedNews (@Valid @RequestBody GetAddedDto addedDto){

        Float Lat = Float.parseFloat(addedDto.getLat());
        Float Lng = Float.parseFloat(addedDto.getLng());
        Date DateFrom = Date.valueOf(addedDto.getDate_from());
        Date DateTo = Date.valueOf(addedDto.getDate_to());
        List<NewsEntity> listCreatedNews = newsService.getUserCreatedNews(Lat,Lng,DateFrom,DateTo);
        listCreatedNews = listCreatedNews.stream()
                .peek(n -> {


                })
                .collect(Collectors.toList());
        //HashMap listWhoCreated = UserService.getWhoCreated(listCreatedNews);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(listCreatedNews);
    }




}
