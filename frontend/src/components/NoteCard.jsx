import { useState } from "react";
import EditNoteForm from "./EditNoteForm";
import "./Notes.css";
import trashIcon from "../assets/trash-white.svg";

export default function NoteCard({ note, onUpdate, onDelete, onChangeStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="note-card-container">
      {isEditing ? (
        <EditNoteForm
          note={note}
          onUpdate={(updatedData) => {
            onUpdate(updatedData);
            setIsEditing(false); 
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
        <div className="note-card">
          <div className="content">
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </div>
          <div className="modification-date">
            <span><strong>Last modification:</strong></span>
            <span>
              {new Date(note.lastModification).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
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
              <button onClick={() => onChangeStatus(note.id, note.status)}>Archive</button>
            )}
            {note.status === "ARCHIVED" && (
              <button onClick={() => onChangeStatus(note.id, note.status)}>Unarchive</button>
            )}
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(note.id, note.status)}>
                <img src={trashIcon} alt="Delete" />
            </button>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
