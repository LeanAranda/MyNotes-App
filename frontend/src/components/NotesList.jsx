import { useEffect, useState } from "react";

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
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
        </div>
    );

    return (
        <div>
            <h2>My notes</h2>
            <button onClick={fetchNotes}>View Active</button>
            <button onClick={fetchArchivedNotes}>View Archived</button>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
                {(showArchived ? archivedNotes : notes).map(renderCard)}
            </div>
        </div>
    );
}
