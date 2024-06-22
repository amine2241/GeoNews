package com.example.server.service;
import com.example.server.dto.NewsDto;
import com.example.server.dto.UserCreateNewsDto;
import com.example.server.entities.NewsEntity;
import com.example.server.entities.UserEntity;
import com.example.server.repositories.NewsRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Base64;
import java.util.List;

@Service
public class NewsService {
    @Autowired
    private NewsRepo newsRepo;

    public void create(@Valid NewsDto newsDto, UserEntity user){
        NewsEntity news = new NewsEntity();

        if(newsRepo.existsByTitle(newsDto.getTitle())){
            news = newsRepo.findByTitle(newsDto.getTitle()).orElseThrow(()->new UsernameNotFoundException("Title not found"));
            user.getNewsPinned().add(news);
            newsRepo.save(news);
        }else{
            news.setTitle(newsDto.getTitle());
            news.setUrl(newsDto.getUrl());
            news.setPic(newsDto.getPic());
            news.setDate(newsDto.getDate());
            news.setLat(newsDto.getLat());
            news.setLng(newsDto.getLng());
            user.getNewsPinned().add(news);
            newsRepo.save(news);
        }
    }
    public void addUserNews(@Valid UserCreateNewsDto userCreateNewsDto, UserEntity user){
        NewsEntity news = new NewsEntity();
            byte[] image = Base64.getEncoder().encode(userCreateNewsDto.getPic().getBytes());
            news.setTitle(userCreateNewsDto.getTitle());
            news.setUrl(userCreateNewsDto.getUrl());
            news.setNewsImage(image);
            news.setDate(userCreateNewsDto.getDate());
            news.setCreatedby(user.getUsername());
            news.setLat(userCreateNewsDto.getLat());
            news.setLng(userCreateNewsDto.getLng());
        System.out.println("new image");
        System.out.println(news.getNewsImage());
            user.getUser_news().add(news);
            newsRepo.save(news);
        }

    public List<NewsEntity> getUserCreatedNews(Float lat, Float lng, Date DateFrom, Date DateTo) {
        Float lat1= lat-1; Float lat2 = lat+1;
        Float lng1= lng-1; Float lng2 = lng+1;
        List<NewsEntity> listCreatedNews = newsRepo.findAllByLatBetweenAndLngBetweenAndDateBetween(lat1,lat2,lng1,lng2,DateFrom,DateTo);
        return listCreatedNews;
    }



}
