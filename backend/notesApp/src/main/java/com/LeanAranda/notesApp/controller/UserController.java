package com.LeanAranda.notesApp.controller;

import com.LeanAranda.notesApp.dto.UserDto;
import com.LeanAranda.notesApp.mapper.UserMapper;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id){
        User user = userService.getById(id);
        return UserMapper.toDto(user);
    }
}
