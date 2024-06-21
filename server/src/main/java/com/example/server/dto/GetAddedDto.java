package com.example.server.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
@Data
public class GetAddedDto {
    @NotEmpty
    private String lat;
    @NotEmpty
    private String lng;
    @NotEmpty
    private String date_from;
    @NotEmpty
    private String date_to;
}
