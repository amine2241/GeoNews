package com.example.server.service;

import com.example.server.dto.AuthResponseDTO;
import com.example.server.entities.Role;
import com.example.server.entities.UserEntity;
import com.example.server.repositories.RoleRepository;
import com.example.server.repositories.UserRepo;
import com.example.server.security.JWTGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.Collections;

@Service

public class UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTGenerator jwtGenerator;


//    @Autowired
//    public UserService(UserRepo userRepo, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
//        this.userRepo = userRepo;
//        this.roleRepository = roleRepository;
//        this.passwordEncoder = passwordEncoder;
//        this.authenticationManager = authenticationManager;
//    }

    public ResponseEntity<AuthResponseDTO> loginUser(@RequestBody UserEntity user){
        System.out.println("hello there partner 10 ");
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        UsernamePasswordAuthenticationToken test =   new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword());
        System.out.println("hello "+ test);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()));
        System.out.println("hello there partner 20 ");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("hello there partner 30 ");
        System.out.println("hello there partner 40 " + jwtGenerator.generateToken(authentication) );
        String token = jwtGenerator.generateToken(authentication);
        System.out.println("hello there partner 40 ");
        return new ResponseEntity<AuthResponseDTO>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    public UserEntity addUser(UserEntity user) {
        user.setPassword(passwordEncoder.encode((user.getPassword())));
        Role roles = roleRepository.findByName("user").orElse(null);
        System.out.println("these are the roles " + roles);
        user.setRoles(Collections.singletonList(roles));
        System.out.println("these are the roles my friend " + user.getRoles());
        return userRepo.save(user);
    }



}
