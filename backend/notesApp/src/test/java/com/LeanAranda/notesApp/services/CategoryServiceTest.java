package com.LeanAranda.notesApp.services;

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
public class CategoryServiceTest {
    @Autowired
    private IUserService userService;
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private INoteService noteService;

    @Test
    public void getCategories(){
        User user = userService.getById(1L);

        System.out.println("\n--- All categories by user ---");
        System.out.println(categoryService.getAllByUser(user));

        System.out.println("\n--- All categories by ids: 1, 3 ---");
        System.out.println(categoryService.getAllByIds(List.of(1L, 3L)));

        System.out.println("\n--- All categories by note ---");
        Note note = noteService.getByIdAndUser(3L, user);
        System.out.println(categoryService.getAllByNote(note));
    }
}
