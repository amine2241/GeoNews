package com.example.server.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Date;

@Data
public class NewsDto {
    private String title;
    private String url;
    private String pic;
    private Date date;
    private String createdbyuser;
    private Float lat;
    private Float lng;
}
