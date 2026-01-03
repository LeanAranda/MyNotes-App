package com.LeanAranda.notesApp.mapper;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.dto.NoteDto;
import com.LeanAranda.notesApp.model.Note;

import java.util.stream.Collectors;

public class NoteMapper {
    public static NoteDto toDto(Note note) {
        NoteDto dto = new NoteDto();
        dto.setId(note.getId());
        dto.setTitle(note.getTitle());
        dto.setText(note.getText());
        dto.setStatus(note.getStatus().name());
        dto.setLastModification(note.getLastModification());
        dto.setCategories(
                note.getCategories().stream()
                        .map(CategoryMapper::toDto)
                        .collect(Collectors.toSet())
        );
        return dto;
    }

    public static Note toEntity(NoteDto dto) {
        Note note = new Note(dto.getTitle(), dto.getText());
        note.setStatus(dto.getStatus() != null ? Enum.valueOf(NoteStatus.class, dto.getStatus()) : NoteStatus.ACTIVE);
        return note;
    }
}
