package com.LeanAranda.notesApp;

import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ApplicationRunner implements CommandLineRunner {
    private final IUserService userService;
    private final ICategoryService categoryService;

    public ApplicationRunner(IUserService userService, ICategoryService categoryService) {
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @Override
    public void run(String... args) throws Exception {
        // if the database is empty, this function creates a default user with their own categories
        // username: user, password: 1234
        dataInitializer();
    }

    private void dataInitializer(){
        if(userService.isEmpty() && categoryService.isEmpty()){

            User user = new User("user", "1234");
            userService.create(user);

            Category category1 = new Category("Work");
            Category category2 = new Category("Study");
            Category category3 = new Category("Important");
            Category category4 = new Category("Others");

            categoryService.create(category1, user);
            categoryService.create(category2, user);
            categoryService.create(category3, user);
            categoryService.create(category4, user);
        }
    }
}
