package com.example.server.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstName;
    private String  lastName;
    private String username;
    private String  email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name= "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName ="id" ))
    private List<Role> roles  = new ArrayList<>();

    @ManyToMany
    @JoinTable(name= "user_pinned_news", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "news_id", referencedColumnName ="newsId" ))
    private List<NewsEntity> newsPinned = new ArrayList<>() ;
    @ManyToMany
    @JoinTable(name= "user_news", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "userId"),
            inverseJoinColumns = @JoinColumn(name = "news_id", referencedColumnName ="newsId" ))
    private List<NewsEntity> user_news = new ArrayList<>() ;
}
