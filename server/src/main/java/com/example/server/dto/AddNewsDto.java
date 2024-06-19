package com.example.server.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AddNewsDto {
    @NotEmpty
    private String title;
    private String url;
    private String pic;
    private String date;
    private Boolean createdbyuser;
    private Float lat;
    private Float lng;
}
