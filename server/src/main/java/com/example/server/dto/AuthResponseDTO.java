package com.example.server.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private String accessToken;
    private String tokenType = "Bearer ";
    private static final  String errorMessage = "wrong info";


    public AuthResponseDTO(String accessToken) {
        this.accessToken = accessToken;
    }

}
