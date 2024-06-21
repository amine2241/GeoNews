package com.example.server.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddNewsDto {
    @NotEmpty(message = "title name is required!")
    private String title;
    @NotEmpty(message = "url  is required!")
    private String url;
    @NotEmpty(message = "Picture  is required!")
    private String pic;
    @NotEmpty(message = "Date  is required!")
    private String date;
    private Boolean createdbyuser;
    private Float lat;
    private Float lng;
}
