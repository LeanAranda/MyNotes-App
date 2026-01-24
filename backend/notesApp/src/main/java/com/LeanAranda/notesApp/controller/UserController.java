package com.LeanAranda.notesApp.controller;

import com.LeanAranda.notesApp.dto.ChangePasswordRequest;
import com.LeanAranda.notesApp.dto.UserDto;
import com.LeanAranda.notesApp.mapper.UserMapper;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        user = userService.changePassword(user, changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        userService.delete(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
