package com.example.server.service;

import com.example.server.entities.User;
import com.example.server.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepo userRepo;
    public User addUser(User user) {
        return userRepo.save(user);
    }


}
