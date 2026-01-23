package com.LeanAranda.notesApp.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class NoteDto {
    private Long id;
    @Size(max = 50, message = "Title cannot exceed the 50 characters limit.")
    private String title;
    @Size(max = 510, message = "Text cannot exceed the 510 characters limit.")
    private String text;
    private String status;
    private LocalDateTime lastModification;
    private Set<CategoryDto> categories;
    private List<Long> categoryIds;
}
