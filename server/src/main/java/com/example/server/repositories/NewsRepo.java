package com.example.server.repositories;

import com.example.server.entities.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository

public interface NewsRepo extends JpaRepository<NewsEntity,Long> {
    Optional<NewsEntity> findByTitle(String title);
    Boolean existsByTitle(String title);

    List<NewsEntity> findAllByLatBetweenAndLngBetweenAndDateBetween(Float lat1, Float lat2, Float lng1, Float lng2, Date date1,Date date2);
}
