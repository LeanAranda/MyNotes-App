package com.LeanAranda.notesApp.service;

import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;

import java.util.List;
import java.util.Set;

public interface ICategoryService {
    Category getByIdAndUser(Long id, User user);
    Category create(Category category, User user);
    List<Category> getAllByUser(User user);
    List<Category> getAllByIds(List<Long> ids);
    Set<Category> getAllByNote(Note note);

    //this method checks if the table "category" is empty, to add a new user when the server starts
    boolean isEmpty();
}
