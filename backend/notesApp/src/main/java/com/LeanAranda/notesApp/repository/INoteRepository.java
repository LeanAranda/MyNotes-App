package com.LeanAranda.notesApp.repository;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface INoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findByIdAndUser(long id, User user);
    List<Note> findAllByUser(User user);
    List<Note> findAllByUserAndStatus(User user, NoteStatus status);
    List<Note> findAllByUserAndStatusAndCategoriesContaining(User user, NoteStatus status, Category category);

    //save
    //update
    //delete (logical)
    //find all archived
    //find all not archived (active)
    //find all by category  (active)
    //find all deleted
    //(by user)
}
