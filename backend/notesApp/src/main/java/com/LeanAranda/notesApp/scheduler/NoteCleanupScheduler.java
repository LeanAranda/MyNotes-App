package com.LeanAranda.notesApp.scheduler;

import com.LeanAranda.notesApp.model.Note;
import com.LeanAranda.notesApp.service.INoteService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class NoteCleanupScheduler {
    private final INoteService noteService;

    public NoteCleanupScheduler(INoteService noteService) {
        this.noteService = noteService;
    }

    // deletes old notes every 1 min
    //@Scheduled(fixedRate = 60000)
    // deletes old notes at 12 AM
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteOldNotes() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(30);
        List<Note> oldDeletedNotes = noteService.getExpiredDeletedNotes(cutoff);
        noteService.dbDeleteList(oldDeletedNotes);

        //success log
        if (!oldDeletedNotes.isEmpty()) {
            System.out.println(LocalDateTime.now() + "  Old notes deleted successfully.");
        }
    }
}
