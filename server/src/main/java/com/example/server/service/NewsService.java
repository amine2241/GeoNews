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

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
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
            news.setCreatedbyuser(false);
            news.setLat(addnewsdto.getLat());
            news.setLng(addnewsdto.getLng());
            user.getNewsPinned().add(news);
            newsRepo.save(news);
        }
    }
    public void addUserNews(@Valid AddNewsDto addnewsdto, UserEntity user){
        NewsEntity news = new NewsEntity();
            byte[] image = Base64.getEncoder().encode(addnewsdto.getPic().getBytes());
            news.setTitle(addnewsdto.getTitle());
            news.setUrl(addnewsdto.getUrl());
            news.setNewsImage(image);
            news.setDate(addnewsdto.getDate());
            news.setCreatedbyuser(true);
            news.setLat(addnewsdto.getLat());
            news.setLng(addnewsdto.getLng());
        System.out.println("new image");
        System.out.println(news.getNewsImage());
            user.getUser_news().add(news);
            newsRepo.save(news);
        }

    public List<NewsEntity> getUserCreatedNews(Float lat,Float lng) {
        Float lat1= lat-1; Float lat2 = lat+1;
        Float lng1= lng-1; Float lng2 = lng+1;
        List<NewsEntity> listCreatedNews = newsRepo.findAllByLatBetweenAndLngBetween(lat1,lat2,lng1,lng2);
        return listCreatedNews;
    }



}
