import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import plusIcon from "../assets/plus-mark.svg";
import "./Notes.css";
import { useToast } from "./ToastMessage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function NotesList() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { showMessage } = useToast();

    const token = localStorage.getItem("token");

    // fetch functions

    const fetchNotes = async () => {
        const res = await fetch(`${API_URL}/notes/myNotes/active`, {
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
        const res = await fetch(`${API_URL}/notes/myNotes/archived`, {
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

    const fetchNotesByCategory = async (categoryId) => {
        try {
            const endpoint = showArchived
                ? "archived"
                : "active";

            const res = await fetch(`${API_URL}/notes/myNotes/${endpoint}/${categoryId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            const data = await res.json();

            if (showArchived) {
                setArchivedNotes(data);
            } else {
                setNotes(data);
            }
        } catch (err) {
            console.error(err);
        }
    };


    // initial data fetch
    // active notes and categories

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => { 
        const fetchCategories = async () => { 
            try { 
                const res = await fetch(`${API_URL}/categories/myCategories`, { 
                    headers: { 
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`, 
                    }, 
                }); 
                if (!res.ok) throw new Error(`Error ${res.status}`); 
                const data = await res.json(); 
                setCategories(data); 
            } catch (err) { 
                console.error(err); 
            } 
        }; 
        fetchCategories(); 
        }, [token]
    );

    // actions

    // archive/unarchive notes
    const changeStatus = async (id, status) => {
        const statusEndpoint = status === "ACTIVE" ? "archive" : "unarchive";
        try {
            const res = await fetch(`${API_URL}/notes/${statusEndpoint}/${id}`, {
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
                showMessage("Note archived successfully");
                fetchNotes();
            } else {
                showMessage("Note unarchived successfully");
                fetchArchivedNotes();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/notes/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }
            showMessage("Note moved to Trash");
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
        const res = await fetch(`${API_URL}/notes/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(note),
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        showMessage("Note created successfully");
        await fetchNotes();
        setShowForm(false);
    };

    const updateNote = async (updatedData) => {
        try {
            const res = await fetch(`${API_URL}/notes/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            showMessage("Note updated successfully");
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
            <div className="top-bar">
                {/*message && ( <div className="toast-message"> {message} </div> )*/}

                <div className="buttons-container">
                    <button onClick={fetchNotes} className={showArchived ? "" : "active-btn"} >View Active</button>
                    <button onClick={fetchArchivedNotes} className={showArchived ? "active-btn" : ""}>View Archived</button>
                    <button className="btn" onClick={() => setShowForm(!showForm)}>
                        <img src={plusIcon} alt="Add" />
                    </button>
                </div>
                
                <div className="filter-container">
                    <label htmlFor="categoryFilter"><strong>Filter by category:</strong></label>
                    
                    <select 
                        value={selectedCategory || ""} 
                        onChange={(e) => { 
                            const value = e.target.value; 
                            setSelectedCategory(value || null); 
                            
                            if (value) { fetchNotesByCategory(value); 

                            } else {
                                showArchived ? fetchArchivedNotes() : fetchNotes(); 
                            } 
                        }} 
                    >

                        <option value="">All</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            

            <div className="cards-container">
                {showForm && <NoteForm onCreate={createNote} onCancel={() => setShowForm(false)} />}

                {(showArchived ? archivedNotes : notes).length === 0 ? (
                    <p>No notes available</p>
                ) : (
                (showArchived ? archivedNotes : notes)
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
                    ))
                )}
            </div>
        </div>
    );
}
