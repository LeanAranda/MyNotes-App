# My Notes - Updates

## Version 1.3 - [2026-01-26]

### Authentication & User Management
- New **register form**: You can now create your account directly from the app.
- New **user menu**: full account management (change password, delete account, logout).
- Restricted username length to 15 characters.
- Username is now saved in localStorage for persistence.
- Automatic tutorial note creation when a new user registers.
- Added global exception handler and UserNotFoundException on the backend.
- New user service methods: register, delete, and changePassword.

### User Interface
- Updated login styles.
- Added icons to section select navigation.
- Responsive improvements for better usability on mobile devices.

### New endpoints
```http
POST    /users/changePassword       → change password (requires old and new password)
DELETE  /users/delete               → delete the logged-in user
```

---

## Version 1.2 - [2026-01-24]

### Notes & Categories
- Categories are now fully manageable: you can create new ones, rename existing ones, and remove those you no longer need.
- Increased note text limit to 510 characters.
- Restricted note title to 50 characters.
- Restricted category name to 20 characters.

### User Interface
- Improved category selection when creating or editing notes.
- Toast notifications are now centralized with a new animation.
- Refined buttons.
- Clear messages are shown when there are no categories available or when a note has no categories assigned.

### Fixes
- Fixed a minor issue with category list rendering that caused console warnings.

### New Endpoints
```http
POST    /categories/create          → create a new category
POST    /categories/update          → update an existing category
DELETE  /categories/delete/{id}     → delete a category by ID
```
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
