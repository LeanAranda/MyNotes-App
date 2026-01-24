import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import "./Notes.css";
const API_URL = import.meta.env.VITE_API_URL;
import { useToast } from "./ToastMessage.jsx";

export default function TrashView() {
    const [deletedNotes, setDeletedNotes] = useState([]);
    const { showMessage } = useToast();

    const token = localStorage.getItem("token");

    const fetchDeletedNotes = async () => {
        try {
            const res = await fetch(`${API_URL}/notes/myNotes/deleted`, {
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
            setDeletedNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDeletedNotes();
    }, []);

    const restoreNote = async (id) => {
        try {
            const res = await fetch(`${API_URL}/notes/restore/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }
            showMessage("Note restored successfully");
            fetchDeletedNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteForever = async (id) => {
        try {
            const res = await fetch(`${API_URL}/notes/dbDelete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }
            showMessage("Note permanently deleted");
            fetchDeletedNotes();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="notes-list-container">
            {/*message && ( <div className="toast-message"> {message} </div> )*/}

            <h4 style={{textAlign: "center"}}>Notes in Trash will be permanently deleted after 30 days.</h4>

            <div className="cards-container">
                {deletedNotes.length === 0 ? (
                    <p>No deleted notes</p>
                ) : (
                    deletedNotes
                        .slice()
                        .sort((a, b) => new Date(b.lastModification) - new Date(a.lastModification))
                        .map((note) => (
                            <NoteCard 
                                key={note.id} 
                                note={note} 
                                trashed 
                                onRestore={() => restoreNote(note.id)}
                                onDeleteForever={() => deleteForever(note.id)}
                            />
                        ))
                    )}
             </div>

        </div>
    );
}