package com.example.server.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
@Component
@EnableAutoConfiguration
public class JWTGenerator {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public String generateToken (Authentication authentication){
        System.out.println("I m here here here 1");
        String username = authentication.getName();
        Date currentDate = new Date();
        System.out.println("I m here here here 2");
        Date expireDate = new Date(currentDate.getTime()+SecurityConstants.JWT_EXPIRATION);
        System.out.println("I m here here here 3");
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
        System.out.println("I m here here here 4");
        return token;
    }
    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public boolean validateToken (String token){
        try {
        Jwts.parser().setSigningKey(SecurityConstants.JWT_SECRET).parseClaimsJwt(token);
        return true ;}
        catch (Exception e){
            throw  new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
