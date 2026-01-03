package com.LeanAranda.notesApp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class NoteDto {
    private Long id;
    private String title;
    private String text;
    private String status;
    private LocalDateTime lastModification;
    private Set<CategoryDto> categories;
    private List<Long> categoryIds;
}
