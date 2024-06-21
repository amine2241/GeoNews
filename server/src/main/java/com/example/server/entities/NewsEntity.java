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
    @Column(name="News_image")
    private byte[] NewsImage;
    private String pic;
    private Date date;
    private String createdby;
    private Float lat;
    private Float lng;
}
