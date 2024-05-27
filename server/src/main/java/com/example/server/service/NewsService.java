package com.example.server.service;
import com.example.server.dto.AddNewsDto;
import com.example.server.entities.NewsEntity;
import com.example.server.entities.Role;
import com.example.server.entities.UserEntity;
import com.example.server.repositories.NewsRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class NewsService {
    @Autowired
    private NewsRepo newsRepo;

    public void create(@Valid AddNewsDto addnewsdto, UserEntity user){
        NewsEntity news = new NewsEntity();

        if(newsRepo.existsByTitle(addnewsdto.getTitle())){
            news = newsRepo.findByTitle(addnewsdto.getTitle()).orElseThrow(()->new UsernameNotFoundException("Title not found"));
            user.getNewsPinned().add(news);
            newsRepo.save(news);
        }else{
            news.setTitle(addnewsdto.getTitle());
            news.setUrl(addnewsdto.getUrl());
            news.setPic(addnewsdto.getPic());
            news.setDate(addnewsdto.getDate());
            user.getNewsPinned().add(news);
            newsRepo.save(news);
        }
    }



}
