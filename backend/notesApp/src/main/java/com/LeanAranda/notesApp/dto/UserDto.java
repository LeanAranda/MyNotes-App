package com.LeanAranda.notesApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    @NotBlank(message = "Username can't be empty")
    @Size(max = 15, message = "Username cannot exceed the 15 characters limit.")
    private String username;
    @NotBlank(message = "Password can't be empty")
    private String password;

}
