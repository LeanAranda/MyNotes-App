# My Notes App
Simple web application for creating, categorizing, and filtering text notes.

This project uses Java Spring Boot for the **backend** and Node.js + React for the **frontend**, all deployed using **Docker**.

---

## Updates
See the full list of changes in the [CHANGELOG.md](./CHANGELOG.md).

---

## Sections
- [Backend](#backend)
- [Frontend](#frontend)
- [Installation & Usage](#installation--usage)

---

# Backend

This is the **backend** service for the Notes App. It exposes a REST API for managing notes and tags, using a layered architecture and persistent storage via MySQL.

---

## Runtimes & Tools

* Java 17
* Spring Boot 4.0.1
* Maven
* JWT
* Spring Web
* Spring Data Jpa
* Mysql Driver
* Lombok
* Validation

---

## Database
Overview of database setup and design:

- MySQL 8.0
- **Time zones:** Dates are stored in UTC and displayed in the user’s local time for consistency.  
- **Schema:** Main tables are `users`, `notes`, and `categories`.
- **Diagram:** An exported ER diagram and the SQL structure file are available in the `/backend/db` folder for reference.

---

## Features
- The model is multi-user support prepared through one-to-many relationships between User, Note, and Category. 
- In the current version, a single user is assumed and categories are global.  
- The model is already prepared to allow each user to manage their own categories associated with their notes if this feature is introduced later on. 
- Possible future additions: full CRUD for users (including registration), categories, and a trash bin.  
- Layered architecture (Controller → Service → Repository).  
- Notes state managed via `status` enum (active, archived, deleted).  
- Passwords stored with BCrypt hashing.  
- Stateless authentication with JWT.

---

## API Endpoints

**Default port:** `9090`  
The service is available at `http://localhost:9090`.


🔹 User
```http
POST    /auth/login                            → login (returns token)
GET     /users/{id}                            → get user by id
```

🔹 Notes
```http
POST    /notes/create                          → create a new note
POST    /notes/update                          → update an existing note
POST    /notes/archive/{id}                    → archive a note by id
POST    /notes/unarchive/{id}                  → unarchive a note by id
DELETE  /notes/delete/{id}                     → delete a note by id
GET     /notes/myNotes/{id}                    → get a note by id
GET     /notes/myNotes/active                  → list active notes of the user
GET     /notes/myNotes/archived                → list archived notes of the user
GET     /notes/myNotes/active/{categoryId}     → list active notes by category
GET     /notes/myNotes/archived/{categoryId}   → list archived notes by category
```

🔹 Category
```http
GET     /categories/myCategories               → list user’s categories
GET     /categories/myCategories/{categoryId}  → get user’s category by id
```

---

# Frontend

This is the **frontend** service of the project, built with React + Vite as a Single Page Application (SPA), and designed to connect with the backend API implemented in Spring Boot.


---

## Runtimes & Tools 
- Node.js 25+
- React 19
- Vite
- Axios (API requests)
- CSS
  
---

## Features
- Single Page Application (SPA) built with React + Vite  
- Create, edit and list notes  
- Apply tags and filter by categories  
- Archive and unarchive notes  
- Delete notes  
- User authentication via JWT (login)
- Background color switch mode button (gray/yellow)

---

## Components

- **NotesList.jsx** → renders the list of notes, filters, and view buttons  
- **NoteCard.jsx** → individual note card, double-click to edit  
- **NoteForm.jsx** → form for creating a new note  
- **EditNoteForm.jsx** → form for editing an existing note  
- **App.jsx** → application entry point with authentication and state management

---

# Installation & Usage

> Make sure you have **Docker** installed on your system before running the project.  

You can run the application in two ways:

### Option 1 – Docker Compose
1) Open an integrated terminal in the **root of the project**.
2) Build and start all services (frontend, backend, database) with a single command:
```bash
docker compose up --build
```

### Option 2 – Run script (linux)
Alternatively, you can use the provided script to set up and start the stack:
1) Open an integrated terminal in the **root of the project**.
2) Give execution permission to the script:
```bash
chmod +x run.sh
```
3) Run the script:
```bash
./run.sh
```

## Accessing the Application
After starting, wait until all services are fully up and running.

Now you can access the frontend at **http://localhost:5173** and start testing all the features of My Notes App.

### Default Login Credentials 
- **Username:** `NotesUser`
- **Password:** `pass123`

## Live Deployed Version 
Deployed in Northflank.com

Try the app online at: https://p01--front--7hnk8wmpgxbr.code.run
