package com.LeanAranda.notesApp.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@ToString(exclude = {"password"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long id;

    @Column(unique = true, nullable = false, length = 15)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean active = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
