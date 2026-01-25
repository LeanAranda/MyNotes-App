package com.LeanAranda.notesApp.serviceImpl;

import com.LeanAranda.notesApp.constants.NoteStatus;
import com.LeanAranda.notesApp.exception.NoteNotFoundException;
import com.LeanAranda.notesApp.model.Category;
import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.model.User;
import com.LeanAranda.notesApp.repository.ICategoryRepository;
import com.LeanAranda.notesApp.repository.INoteRepository;
import com.LeanAranda.notesApp.service.ICategoryService;
import com.LeanAranda.notesApp.service.INoteService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@Service
public class NoteServiceImpl implements INoteService {
    private final INoteRepository noteRepository;
    private final ICategoryService categoryService;

    public NoteServiceImpl(INoteRepository noteRepository, ICategoryService categoryService) {
        this.noteRepository = noteRepository;
        this.categoryService = categoryService;
    }


    @Override
    public Note getByIdAndUser(Long id, User user) {

        return noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new NoteNotFoundException("Note not found or does not belong to user"));
    }

    @Override
    public Note create(Note note, List<Long> categoryIds, User user) {
        note.setUser(user);

        List<Category> categories = categoryService.getAllByIds(categoryIds);
        note.getCategories().addAll(categories);

        note.setStatus(NoteStatus.ACTIVE);
        note.setCreatedAt(LocalDateTime.now());
        note.setLastModification(LocalDateTime.now());

        return noteRepository.save(note);
    }

    @Override
    public Note update(Long id, String title, String text, List<Long> categoryIds, User user) {
        Note note = getByIdAndUser(id, user);

        note.setTitle(title);
        note.setText(text);
        note.setLastModification(LocalDateTime.now());

        List<Category> categories = categoryService.getAllByIds(categoryIds);
        note.setCategories(new HashSet<>(categories));

        return noteRepository.save(note);
    }

    @Override
    public void archive(Long id, User user) {
        Note note = getByIdAndUser(id, user);

        note.setStatus(NoteStatus.ARCHIVED);
        note.setLastModification(LocalDateTime.now());

        noteRepository.save(note);
    }

    @Override
    public void unarchive(Long id, User user) {
        Note note = getByIdAndUser(id, user);

        note.setStatus(NoteStatus.ACTIVE);
        note.setLastModification(LocalDateTime.now());

        noteRepository.save(note);
    }

    @Override
    public void deleteById(Long id, User user) {
        Note note = getByIdAndUser(id, user);

        note.setStatus(NoteStatus.DELETED);
        note.setLastModification(LocalDateTime.now());

        noteRepository.save(note);
    }

    @Override
    public void dbDeleteById(Long id, User user) {
        Note note = getByIdAndUser(id, user);
        noteRepository.delete(note);
    }

    @Override
    public void dbDeleteList(List<Note> notes) {
        noteRepository.deleteAll(notes);
    }

    @Override
    public void deleteByUser(User user) {
        noteRepository.deleteAll(getAllByUser(user));
    }

    @Override
    public void restore(Long id, User user) {
        Note note = getByIdAndUser(id, user);

        note.setStatus(NoteStatus.ACTIVE);
        note.setLastModification(LocalDateTime.now());

        noteRepository.save(note);
    }

    @Override
    public List<Note> getAllByUser(User user) {
        return noteRepository.findAllByUser(user);
    }

    @Override
    public List<Note> getAllByUserAndStatus(User user, NoteStatus status) {
        return noteRepository.findAllByUserAndStatus(user, status);
    }

    @Override
    public List<Note> getAllByUserAndCategoryAndStatus(User user, Category category, NoteStatus status) {
        return noteRepository.findAllByUserAndStatusAndCategoriesContaining(user, status, category);
    }

    @Override
    public List<Note> getExpiredDeletedNotes(LocalDateTime lastModificationBefore) {
        return noteRepository.findByStatusAndLastModificationBefore(NoteStatus.DELETED, lastModificationBefore);
    }

    @Override
    public void addTutorialNotes(User user) {
        Category category = categoryService.create(new Category("Tutorial"), user);

        Note note1 = new Note("Organize with Tags", "You can tag your notes and filter them using the toolbar above.");
        Note note2 = new Note("Archived Notes", "You can archive or unarchive your notes with a single click.");
        Note note3 = new Note("Deleting Notes ", "Click the trash can to remove notes you no longer need.");
        Note note4 = new Note("Getting Started", "Click the '+' button to create a new note. Double‑tap any note to open it for editing.");
        Note note5 = new Note("Welcome to My Notes App!", "This is your first note. Here you can create, edit, and organize your ideas with ease.");

        create(note1, List.of(category.getId()), user);
        note2 = create(note2, List.of(category.getId()), user);
        create(note3, List.of(category.getId()), user);
        create(note4, List.of(category.getId()), user);
        create(note5, List.of(category.getId()), user);

        archive(note2.getId(), user);
    }

}
