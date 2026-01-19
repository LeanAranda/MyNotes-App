package com.LeanAranda.notesApp.service;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;

import java.time.LocalDateTime;
import java.util.List;

public interface INoteService {
    Note getByIdAndUser(Long id, User user);
    Note create(Note note, List<Long> categoryIds, User user);
    Note update(Long id, String title, String text, List<Long> categoryIds, User user);
    void archive(Long id, User user);
    void unarchive(Long id, User user);
    void deleteById(Long id, User user);
    void dbDeleteById(Long id, User user);
    void dbDeleteList(List<Note> notes);
    void restore(Long id, User user);
    List<Note> getAllByUser(User user);
    List<Note> getAllByUserAndStatus(User user, NoteStatus status);
    List<Note> getAllByUserAndCategoryAndStatus(User user, Category category, NoteStatus status);
    List<Note> getExpiredDeletedNotes(LocalDateTime lastModificationBefore);
}
