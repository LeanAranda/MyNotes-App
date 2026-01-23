package com.LeanAranda.notesApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    @NotBlank(message = "Name can't be empty")
    @Size(max = 20, message = "Name cannot exceed the 20 characters limit.")
    private String name;
}
