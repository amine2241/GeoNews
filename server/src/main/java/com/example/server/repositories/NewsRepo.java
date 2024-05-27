package com.example.server.repositories;

import com.example.server.entities.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface NewsRepo extends JpaRepository<NewsEntity,Long> {
    Optional<NewsEntity> findByTitle(String title);
}
