package com.example.server.service;
import com.example.server.dto.AddNewsDto;
import com.example.server.entities.NewsEntity;
import com.example.server.repositories.NewsRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsService {
    @Autowired
    private NewsRepo newsRepo;

    public NewsEntity create(@Valid AddNewsDto addnewsdto){
        NewsEntity news = new NewsEntity();
        news.setTitle(addnewsdto.getTitle());
        news.setUrl(addnewsdto.getUrl());
        news.setPic(addnewsdto.getPic());
        news.setDate(addnewsdto.getDate());
        return  newsRepo.save(news);
    }

}
