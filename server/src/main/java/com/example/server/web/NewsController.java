package com.example.server.web;



import com.example.server.dto.AddNewsDto;
import com.example.server.entities.NewsEntity;
import com.example.server.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/news")
@Controller
public class NewsController {

    @Autowired
    NewsService newsService;

    @PostMapping(path="/pin")
    public @ResponseBody ResponseEntity CreateNews (@Valid @RequestBody AddNewsDto addnewsdto){
        System.out.println("news control");
        newsService.create(addnewsdto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");
    }



}
