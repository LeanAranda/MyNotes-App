package com.LeanAranda.notesApp.services;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.INoteService;
import com.LeanAranda.notesApp.service.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class NoteServiceTest {
    @Autowired
    private IUserService userService;
    @Autowired
    private INoteService noteService;
    @Autowired
    private ICategoryService categoryService;

    @Test
    public void createNote() {
        User user = userService.getByUsername("user");
        Note note = new Note("note 3", "deleted");

        noteService.create(note, List.of(1L, 3L, 2L), user);
    }

    @Test
    public void editNote() {
        User user = userService.getByUsername("user");

        noteService.update(3L,"note 3", "active", List.of(1L, 2L, 3L), user);
    }

    @Test
    public void changeStatus() {
        User user = userService.getByUsername("user");

        noteService.unarchive(1L, user);
        noteService.deleteById(2L, user);
    }

    @Test
    public void getNotes() {
        User user = userService.getByUsername("user");

        System.out.println("\n--- All notes by user ---");
        System.out.println(noteService.getAllByUser(user));

        System.out.println("\n--- All notes with status: ACTIVE by user ---");
        System.out.println(noteService.getAllByUserAndStatus(user, NoteStatus.ACTIVE));

        System.out.println("\n--- All notes with status: ARCHIVED by user ---");
        System.out.println(noteService.getAllByUserAndStatus(user, NoteStatus.ARCHIVED));

        System.out.println("\n--- All notes with status: DELETED by user ---");
        System.out.println(noteService.getAllByUserAndStatus(user, NoteStatus.DELETED));

        System.out.println("\n--- All notes with status: ACTIVE by user and category: Work ---");
        Category category = categoryService.getByIdAndUser(1L, user);
        System.out.println(noteService.getAllByUserAndCategoryAndStatus(user, category, NoteStatus.ACTIVE));
    }
}
