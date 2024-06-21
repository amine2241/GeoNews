package com.example.server.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.sql.Date;

@Data
public class AddNewsDto {
    @NotEmpty
    private String title;
    private String url;
    private String pic;
    private Date date;
    private String createdbyuser;
    private Float lat;
    private Float lng;
}
