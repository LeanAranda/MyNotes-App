package com.LeanAranda.notesApp.repository;

import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findAllByUser(User user);
    Optional<Category> findByIdAndUser(Long id, User user);

    //save
    //find all
    //find all by note
    //crud (later)
}
