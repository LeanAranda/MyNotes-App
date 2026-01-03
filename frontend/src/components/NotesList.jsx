import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const token = localStorage.getItem("token");

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

    useEffect(() => {
        fetchNotes();
    }, []);

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

    const renderCard = (note) => (
        <div
            key={note.id}
            style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", width: "250px", backgroundColor: "#fff", }}
        >
            <h3>{note.title}</h3>
            <p>{note.text}</p>
            <p><strong>Status:</strong> {note.status}</p>
            <p><strong>Last modification:</strong> {new Date(note.lastModification).toLocaleString()}</p>
            <p>
                <strong>Categories:</strong>{" "}
                {note.categories.map((c) => c.name).join(", ")}
            </p>
            {note.status === "ACTIVE" && (
                <button onClick={() => changeStatus(note.id, note.status)}>archive</button>
            )}
            {note.status === "ARCHIVED" && (
                <button onClick={() => changeStatus(note.id, note.status)}>unarchive</button>
            )}
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

    return (
        <div>
            <h2>My notes</h2>
            <button onClick={() => setShowForm(!showForm)}>+</button>
            {showForm && <NoteForm onCreate={createNote} />}
            <button onClick={fetchNotes}>View Active</button>
            <button onClick={fetchArchivedNotes}>View Archived</button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
                {(showArchived ? archivedNotes : notes).map(renderCard)}
            </div>
        </div>
    );
}
