package com.LeanAranda.notesApp.serviceImpl;

import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.repository.ICategoryRepository;
import com.LeanAranda.notesApp.service.ICategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class CategoryServiceImpl implements ICategoryService {
    private final ICategoryRepository categoryRepository;

    public CategoryServiceImpl(ICategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category getByIdAndUser(Long id, User user) {
        return categoryRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    }

    @Override
    public Category create(Category category, User user) {
        category.setUser(user);
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllByUser(User user) {
        return categoryRepository.findAllByUser(user);
    }

    @Override
    public List<Category> getAllByIds(List<Long> ids) {
        return categoryRepository.findAllById(ids);
    }

    @Override
    public Set<Category> getAllByNote(Note note) {
        return note.getCategories();
    }

    @Override
    public boolean isEmpty() {
        return categoryRepository.count() == 0;
    }
}
