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
    public ResponseEntity<NoteDto> createNote(@RequestBody NoteDto noteDto){
        //TODO get user by login
        User user = userService.getById(1L);
        Note note = NoteMapper.toEntity(noteDto);
        Note created = noteService.create(note, noteDto.getCategoryIds(), user);
        return ResponseEntity.status(HttpStatus.CREATED).body(NoteMapper.toDto(created));
    }

    @PostMapping("/update")
    public ResponseEntity<NoteDto> updateNote(@RequestBody NoteDto noteDto){
        //TODO get user by login
        User user = userService.getById(1L);
        Note updated = noteService.update(noteDto.getId(), noteDto.getTitle(), noteDto.getText(), noteDto.getCategoryIds(), user);
        return ResponseEntity.status(HttpStatus.OK).body(NoteMapper.toDto(updated));
    }

    @PostMapping("/archive/{id}")
    public ResponseEntity<Void> archiveNote(@PathVariable Long id){
        //TODO get user by login
        User user = userService.getById(1L);
        noteService.archive(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/unarchive/{id}")
    public ResponseEntity<Void> unarchiveNote(@PathVariable Long id){
        //TODO get user by login
        User user = userService.getById(1L);
        noteService.unarchive(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id){
        //TODO get user by login
        User user = userService.getById(1L);
        noteService.deleteById(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/myNotes/{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable Long id){
        //TODO get user by login
        User user = userService.getById(1L);
        Note note = noteService.getByIdAndUser(id, user);
        return ResponseEntity.ok(NoteMapper.toDto(note));
    }

    @GetMapping("/myNotes/active")
    public ResponseEntity<List<NoteDto>> getNotesByUser(){
        //TODO get user by login
        User user = userService.getById(1L);
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.ACTIVE)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/active/{categoryId}")
    public ResponseEntity<List<NoteDto>> getNotesByUserAndCategory(@PathVariable("categoryId") Long categoryId){
        //TODO get user by login
        User user = userService.getById(1L);
        Category category = categoryService.getByIdAndUser(categoryId, user);
        List<NoteDto> notes = noteService.getAllByUserAndCategoryAndStatus(user, category, NoteStatus.ACTIVE)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/archived")
    public ResponseEntity<List<NoteDto>> getNotesArchivedByUser(){
        //TODO get user by login
        User user = userService.getById(1L);
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.ARCHIVED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/archived/{categoryId}")
    public ResponseEntity<List<NoteDto>> getNotesArchivedByUserAndCategory(@PathVariable("categoryId") Long categoryId){
        //TODO get user by login
        User user = userService.getById(1L);
        Category category = categoryService.getByIdAndUser(categoryId, user);
        List<NoteDto> notes = noteService.getAllByUserAndCategoryAndStatus(user, category, NoteStatus.ARCHIVED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/myNotes/deleted")
    public ResponseEntity<List<NoteDto>> getNotesDeletedByUser(){
        //TODO get user by login
        User user = userService.getById(1L);
        List<NoteDto> notes = noteService.getAllByUserAndStatus(user, NoteStatus.DELETED)
                .stream().map(NoteMapper::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(notes);
    }
}
