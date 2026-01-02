package com.LeanAranda.notesApp.services;

import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTest {
    @Autowired
    private IUserService userService;

    @Test
    public void createUser(){
        User user = new User("user", "1234");

        assertNotNull(user);
    }

    @Test
    public void getUsers(){
        User user1 = userService.getByUsername("user");
        assertNotNull(user1);

        System.out.println("\n--- user 1 ---");
        System.out.println(user1);

        User user2 = userService.getById(1L);
        assertNotNull(user2);

        System.out.println("\n--- user 2 ---");
        System.out.println(user2);

        assertTrue(userService.existsByUsername("user"), "user named 'user' exists");
    }
}
