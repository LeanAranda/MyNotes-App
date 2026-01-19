package com.LeanAranda.notesApp.controller;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.dto.NoteDto;
import com.LeanAranda.notesApp.mapper.NoteMapper;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.INoteService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notes")
public class NoteController {
    private final IUserService userService;
    private final INoteService noteService;
    private final ICategoryService categoryService;

    public NoteController(IUserService userService, INoteService noteService, ICategoryService categoryService) {
        this.userService = userService;
        this.noteService = noteService;
        this.categoryService = categoryService;
    }

    @PostMapping("/create")
    public ResponseEntity<NoteDto> createNote(@RequestBody NoteDto noteDto, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Note note = NoteMapper.toEntity(noteDto);
        Note created = noteService.create(note, noteDto.getCategoryIds(), user);
        return ResponseEntity.status(HttpStatus.CREATED).body(NoteMapper.toDto(created));
    }

    @PostMapping("/update")
    public ResponseEntity<NoteDto> updateNote(@RequestBody NoteDto noteDto, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Note updated = noteService.update(noteDto.getId(), noteDto.getTitle(), noteDto.getText(), noteDto.getCategoryIds(), user);
        return ResponseEntity.status(HttpStatus.OK).body(NoteMapper.toDto(updated));
    }

    @PostMapping("/archive/{id}")
    public ResponseEntity<Void> archiveNote(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        noteService.archive(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/unarchive/{id}")
    public ResponseEntity<Void> unarchiveNote(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        noteService.unarchive(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        noteService.deleteById(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/dbDelete/{id}")
    public ResponseEntity<Void> dbDeleteNote(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        noteService.dbDeleteById(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/restore/{id}")
    public ResponseEntity<Void> restoreNote(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        noteService.restore(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/myNotes/{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Note note = noteService.getByIdAndUser(id, user);
        return ResponseEntity.ok(NoteMapper.toDto(note));
    }

    @GetMapping("/myNotes/active")
    public ResponseEntity<List<NoteDto>> getNotesByUser(Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.ACTIVE)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/active/{categoryId}")
    public ResponseEntity<List<NoteDto>> getNotesByUserAndCategory(@PathVariable("categoryId") Long categoryId, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Category category = categoryService.getByIdAndUser(categoryId, user);
        List<NoteDto> notes = noteService.getAllByUserAndCategoryAndStatus(user, category, NoteStatus.ACTIVE)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/archived")
    public ResponseEntity<List<NoteDto>> getNotesArchivedByUser(Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.ARCHIVED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/archived/{categoryId}")
    public ResponseEntity<List<NoteDto>> getNotesArchivedByUserAndCategory(@PathVariable("categoryId") Long categoryId, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Category category = categoryService.getByIdAndUser(categoryId, user);
        List<NoteDto> notes = noteService.getAllByUserAndCategoryAndStatus(user, category, NoteStatus.ARCHIVED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/deleted")
    public ResponseEntity<List<NoteDto>> getNotesDeletedByUser(Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.DELETED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }
}
