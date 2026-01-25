package com.LeanAranda.notesApp.serviceImpl;

import com.LeanAranda.notesApp.exception.UserNotFoundException;
import com.LeanAranda.notesApp.exception.UsernameAlreadyExistsException;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.repository.IUserRepository;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.INoteService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;
    private final INoteService noteService;
    private final ICategoryService categoryService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(IUserRepository userRepository, INoteService noteService, ICategoryService categoryService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.noteService = noteService;
        this.categoryService = categoryService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User getByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User create(User user) {
        if(existsByUsername(user.getUsername())) throw new UsernameAlreadyExistsException(user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userRepository.save(user);
        noteService.addTutorialNotes(newUser);
        return newUser;
    }

    @Override
    public User changePassword(User user, String oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old Password does not match New Password");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        categoryService.deleteByUser(user);
        noteService.deleteByUser(user);
        userRepository.delete(user);
    }

    @Override
    public boolean isEmpty() {
        return userRepository.count() == 0;
    }
}
