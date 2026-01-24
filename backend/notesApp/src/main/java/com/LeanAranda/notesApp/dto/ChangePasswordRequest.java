package com.LeanAranda.notesApp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    @NotBlank(message = "Password can't be empty")
    public String oldPassword;
    @NotBlank(message = "Password can't be empty")
    public String newPassword;
}
