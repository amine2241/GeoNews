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

import java.nio.charset.Charset;
import java.security.Key;
import java.util.Date;
@Component
@EnableAutoConfiguration
public class JWTGenerator {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public String generateToken (Authentication authentication){
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime()+SecurityConstants.JWT_EXPIRATION);
        System.out.println("la date est "+ expireDate);
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();
        return token;
    }
    public String getUsernameFromJwt(String token) {
        System.out.println("this is the key "+ key);
        token = token.replace("\"","");
        Claims claims =  Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
        System.out.println(claims.getSubject());
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
