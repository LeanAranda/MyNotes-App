# My Notes - Updates

---

## Version 1.1 - [2026-01-22]

### New Features
- **Trash Bin**: Notes can now be moved to the trash bin before permanent deletion.
- **Top Bar Section Selector**: Added a new section selector in the top bar for easier navigation. 
- **Category Management Section**: Currently in development.
- **Automatic Cleanup**: Notes in the trash are permanently deleted after 30 days (NoteCleanupScheduler).

### New Endpoints
```http
DELETE  /notes/dbDelete/{id}    → permanently delete a note from the database
POST    /notes/restore/{id}     → restore a note from the trash back to active status
```

---

## Version 1.0 [2026-01-17] 
### Initial release of **My Notes App** 
- User authentication (login).
- Create, update, and delete notes.
- Category filters.
- Archive and unarchive functionality.

---