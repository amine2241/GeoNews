package com.example.server.entities;

import jakarta.persistence.*;
import lombok.*;

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
    private String date;
    private Boolean createdbyuser;
    private Float lat;
    private Float lng;
}
