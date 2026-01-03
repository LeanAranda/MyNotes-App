package com.LeanAranda.notesApp.controller;

import com.LeanAranda.notesApp.dto.CategoryDto;
import com.LeanAranda.notesApp.mapper.CategoryMapper;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final IUserService userService;
    private final ICategoryService categoryService;

    public CategoryController(IUserService userService, ICategoryService categoryService) {
        this.userService = userService;
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> getCategoriesByUser() {
        //TODO get user by login
        User user = userService.getById(1L);
        List<CategoryDto> categories = categoryService.getAllByUser(user).stream()
                .map(CategoryMapper::toDto).toList();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{categoryId}")
    public CategoryDto getById(@PathVariable("categoryId") Long categoryId) {
        //TODO get user by login
        User user = userService.getById(1L);
        Category category = categoryService.getByIdAndUser(categoryId, user);
        return CategoryMapper.toDto(category);
    }
}
