package com.LeanAranda.notesApp.service;

import com.LeanAranda.notesApp.model.User;

public interface IUserService {
    User getById(Long id);
    User getByUsername(String username);
    boolean existsByUsername(String username);
    User create(User user);

    //this method checks if the table "user" is empty, to add a new user when the server starts
    boolean isEmpty();
}
