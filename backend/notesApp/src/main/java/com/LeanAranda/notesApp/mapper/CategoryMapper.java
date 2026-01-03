package com.LeanAranda.notesApp.mapper;

import com.LeanAranda.notesApp.dto.CategoryDto;
import com.LeanAranda.notesApp.model.Category;

public class CategoryMapper {

    public static CategoryDto toDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }
}
