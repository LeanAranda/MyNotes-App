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
    private final ICategoryService categoryService;
    private final INoteService  noteService;

    public ApplicationRunner(IUserService userService, ICategoryService categoryService, INoteService noteService) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.noteService = noteService;
    }

    @Override
    public void run(String... args) throws Exception {
        // if the database is empty, this function creates a default user with their own categories
        // username: user, password: 1234
        dataInitializer();
    }

    private void dataInitializer(){
        if(userService.isEmpty() && categoryService.isEmpty()){

            User user = new User("notesUser", "notesPassword");
            userService.create(user);

            Category category1 = new Category("Work");
            Category category2 = new Category("Study");
            Category category3 = new Category("Important");
            Category category4 = new Category("Others");
            Category category5 = new Category("Tutorial");

            categoryService.create(category1, user);
            categoryService.create(category2, user);
            categoryService.create(category3, user);
            categoryService.create(category4, user);
            categoryService.create(category5, user);

            Note note1 = new Note("Welcome to My Notes App!", "This is your first note. Here you can create, edit, and organize your ideas with ease.");
            Note note2 = new Note("Getting Started", "Click the '+' button to create a new note. Double‑tap any note to open it for editing.");
            Note note3 = new Note("Deleting Notes ", "Click the trash can to remove notes you no longer need.");
            Note note4 = new Note("Archived Notes", "You can archive or unarchive your notes with a single click.");
            Note note5 = new Note("Organize with Tags", "You can tag your notes and filter them using the toolbar above.");

            noteService.create(note5, List.of(5L), user);
            noteService.create(note4, List.of(5L), user);
            noteService.create(note3, List.of(5L), user);
            noteService.create(note2, List.of(5L), user);
            noteService.create(note1, List.of(5L), user);

            noteService.archive(2L, user);
        }
    }
}
