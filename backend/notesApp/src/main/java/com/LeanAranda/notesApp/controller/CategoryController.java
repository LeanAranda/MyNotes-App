package com.LeanAranda.notesApp.controller;

import com.LeanAranda.notesApp.dto.CategoryDto;
import com.LeanAranda.notesApp.mapper.CategoryMapper;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/myCategories")
    public ResponseEntity<List<CategoryDto>> getCategoriesByUser(Authentication authentication) {
        User user = userService.getByUsername(authentication.getName());
        List<CategoryDto> categories = categoryService.getAllByUser(user).stream()
                .map(CategoryMapper::toDto).toList();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/myCategories/{categoryId}")
    public CategoryDto getCategoryById(@PathVariable("categoryId") Long categoryId, Authentication authentication) {
        User user = userService.getByUsername(authentication.getName());
        Category category = categoryService.getByIdAndUser(categoryId, user);
        return CategoryMapper.toDto(category);
    }

    @PostMapping("/create")
    public ResponseEntity<CategoryDto> createCategory(@RequestBody CategoryDto categoryDto, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Category category = categoryService.create(new Category(categoryDto.getName()), user);
        return ResponseEntity.status(HttpStatus.OK).body(CategoryMapper.toDto(category));
    }

    @PostMapping("/update")
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        Category updated = categoryService.update(categoryDto.getId(), user, categoryDto.getName());
        return ResponseEntity.status(HttpStatus.OK).body(CategoryMapper.toDto(updated));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id, Authentication authentication){
        User user = userService.getByUsername(authentication.getName());
        categoryService.delete(id, user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
