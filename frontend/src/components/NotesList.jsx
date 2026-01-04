import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import "./Notes.css";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem("token");

    // fetch functions

    const fetchNotes = async () => {
        const res = await fetch("http://localhost:8080/notes/myNotes/active", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }
        const data = await res.json();
        setNotes(data);
        setShowArchived(false);
    };

    const fetchArchivedNotes = async () => {
        const res = await fetch("http://localhost:8080/notes/myNotes/archived", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        }
        const data = await res.json();
        setArchivedNotes(data);
        setShowArchived(true);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    // card rendering and actions

    const renderCard = (note) => (
        <div key={note.id} className="note-card">
            <div className="content">
                <h3>{note.title}</h3>
                <p>{note.text}</p>
            </div>
            <div className="modification-date">
                <span><strong>Last modification:</strong></span>
                <span> 
                    {new Date(note.lastModification).toLocaleString("en-US", { 
                        year: "numeric", month: "short", day: "numeric", 
                        hour: "numeric", minute: "numeric", hour12: true,     
                    })} 

                </span>
            </div>
            <div className="categories">
                <strong>Categories:</strong>{" "}
                <div className="categories-list">
                    {note.categories.map((c, index) => (
                    <span key={index} className="category-item">
                        {c.name}
                    </span>
                ))}
                </div>
            </div>
            <div className="card-buttons-container">
                {note.status === "ACTIVE" && (
                    <button onClick={() => changeStatus(note.id, note.status)}>Archive</button>
                )}
                {note.status === "ARCHIVED" && (
                    <button onClick={() => changeStatus(note.id, note.status)}>Unarchive</button>
                )}
                <button className="delete-btn" onClick={() => deleteNote(note.id, note.status)}>Delete</button>
            </div>
        </div>
    );

    const changeStatus = async (id, status) => {
        const statusEndpoint = status === "ACTIVE" ? "archive" : "unarchive";
        try {
            const res = await fetch(`http://localhost:8080/notes/${statusEndpoint}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }
            if (status === "ACTIVE") {
                fetchNotes();
            } else {
                fetchArchivedNotes();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:8080/notes/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }
            if (status === "ACTIVE") {
                fetchNotes();
            } else {
                fetchArchivedNotes();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const createNote = async (note) => { 
        const res = await fetch("http://localhost:8080/notes/create", { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`,
            }, 
            body: JSON.stringify(note), 
        }); 
        if (!res.ok) throw new Error(`Error ${res.status}`); 
        await fetchNotes(); 
        setShowForm(false); 
    };

    const updateNote = async (updatedData) => {
        try {
            const res = await fetch(`http://localhost:8080/notes/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);

            if (showArchived) {
                fetchArchivedNotes();
            } else {
                fetchNotes();
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="notes-list-container">
            <div className="buttons-container">
                <button onClick={fetchNotes}>View Active</button>
                <button onClick={fetchArchivedNotes}>View Archived</button>
                <button onClick={() => setShowForm(!showForm)}>+</button>
            </div>
            
            <div className="cards-container">
                {showForm && <NoteForm onCreate={createNote} onCancel={() => setShowForm(false)} />}
                {(showArchived ? archivedNotes : notes)
                    .slice()
                    .sort((a, b) => new Date(b.lastModification) - new Date(a.lastModification))
                    .map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onUpdate={updateNote}
                            onDelete={deleteNote}
                            onChangeStatus={changeStatus}
                        />
                    ))}
            </div>
        </div>
    );
}
