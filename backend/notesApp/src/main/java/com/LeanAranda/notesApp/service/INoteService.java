package com.LeanAranda.notesApp.service;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;

import java.util.List;
import java.util.Optional;

public interface INoteService {
    Note getByIdAndUser(Long id, User user);
    void create(Note note, List<Long> categoryIds, User user);
    void update(Long id, String title, String text, List<Long> categoryIds, User user);
    void archive(Long id, User user);
    void unarchive(Long id, User user);
    void deleteById(Long id, User user);
    List<Note> getAllByUser(User user);
    List<Note> getAllByUserAndStatus(User user, NoteStatus status);
    List<Note> getAllByUserAndCategoryAndStatus(User user, Category category, NoteStatus status);
}
