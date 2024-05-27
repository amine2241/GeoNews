package com.example.server.dto;

import lombok.Data;

@Data
public class AddNewsDto {
    private String title;
    private String url;
    private String pic;
    private String date;
}
