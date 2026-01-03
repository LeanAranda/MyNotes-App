package com.LeanAranda.notesApp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private Long id;
    @NotBlank(message = "Name can't be empty")
    private String name;
}
