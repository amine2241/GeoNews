package com.example.server.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
@Data
public class LatLngDto {
    @NotEmpty
    private String lat;
    @NotEmpty
    private String lng;
}
