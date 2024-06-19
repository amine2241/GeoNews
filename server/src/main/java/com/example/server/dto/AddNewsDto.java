package com.example.server.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddNewsDto {
    @NotEmpty
    private String title;
    private String url;
    private String pic;
    private String date;
    private String latlng;
}
