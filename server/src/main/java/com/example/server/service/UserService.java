package com.example.server.service;

import com.example.server.dto.AuthResponseDTO;
import com.example.server.dto.RegisterDto;
import com.example.server.entities.Role;
import com.example.server.entities.UserEntity;
import com.example.server.repositories.RoleRepository;
import com.example.server.repositories.UserRepo;
import com.example.server.security.JWTGenerator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;


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

    public ResponseEntity<?> loginUser(UserEntity user){
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        UsernamePasswordAuthenticationToken test =   new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword());
        System.out.println("i m here so hello ");
        try{
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()));
//        if (!authentication.isAuthenticated()){
//            System.out.println("i m here so hello ");
//            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE,"wrong user info");
//        }
        System.out.println("authentication"+authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<AuthResponseDTO>(new AuthResponseDTO(token), HttpStatus.OK);}
        catch (AuthenticationException e){
            return new ResponseEntity<String>("Username or Password are wrong ", HttpStatus.NOT_ACCEPTABLE);
        }
    }
    public Boolean UsernameUnique(@Valid RegisterDto registerDto){
        boolean state = userRepo.existsByUsername(registerDto.getUsername());
        System.out.println(!state);
        return !state;
    }

    public UserEntity addUser(@Valid RegisterDto registerDto) {
        UserEntity user = new UserEntity();
        user.setFirstName(registerDto.getFirstName());
        user.setLastName(registerDto.getLastName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode((registerDto.getPassword())));
        Role roles = roleRepository.findByName("user").orElse(null);
        System.out.println("these are the roles " + roles);
        user.setRoles(Collections.singletonList(roles));
        System.out.println("these are the roles my friend " + user.getRoles());
        return userRepo.save(user);
    }
    public String  getUsername(String token ) {
        String username = jwtGenerator.getUsernameFromJwt(token);
        System.out.println(username);
        return username;
    }



}
