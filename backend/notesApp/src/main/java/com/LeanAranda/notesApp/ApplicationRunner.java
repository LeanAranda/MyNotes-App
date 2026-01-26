package com.LeanAranda.notesApp;

import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.INoteService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationRunner implements CommandLineRunner {
    private final IUserService userService;

    public ApplicationRunner(IUserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        // if the database is empty, this function creates a new default user
        // username: NotesUser, password: pass123
        dataInitializer();
    }

    private void dataInitializer(){
        if(userService.isEmpty()){
            User user = new User("NotesUser", "pass123");
            userService.create(user);
        }
    }
}
