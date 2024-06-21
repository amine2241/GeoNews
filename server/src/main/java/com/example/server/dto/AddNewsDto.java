package com.example.server.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Date;

@Data
public class AddNewsDto {
    @NotEmpty(message = "title name is required!")
    private String title;
    @NotEmpty(message = "url  is required!")
    private String url;
    @NotEmpty(message = "Picture  is required!")
    private String pic;
    @NotNull(message = "Date  is required!")
    private Date date;
    private String createdbyuser;
    private Float lat;
    private Float lng;
}
