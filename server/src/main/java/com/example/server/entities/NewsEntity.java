package com.example.server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@Builder
public class NewsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long newsId;
    private String title;
    private String url;
    @Lob
    @Column(name = "News_image", columnDefinition = "TEXT")
    private String newsImage; // Store as Base64 string
    private String pic;
    private Date date;
    private String createdby;
    private Float lat;
    private Float lng;
}
