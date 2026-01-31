import { useState } from "react";
import EditNoteForm from "./EditNoteForm";
import "./Notes.css";
import trashIcon from "../assets/trash-white.svg";

export default function NoteCard({ note, trashed, onUpdate, onDelete, onChangeStatus, onRestore, onDeleteForever }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = () => {
    if (!trashed) {
      setIsEditing(true);
    }
  };

  const MAX_LENGTH = 250;
  const MAX_LINES = 8;
  const lines = note.text.split("\n");
  const isTextLong = (lines.length > MAX_LINES || note.text.length > MAX_LENGTH);

  let displayedText;
  if (expanded) {
    displayedText = note.text;
  } else {
    if (lines.length > MAX_LINES) {
      displayedText = lines.slice(0, MAX_LINES).join("\n");
    } else {
      displayedText = note.text.slice(0, MAX_LENGTH);
    }
  }

  const daysLeft = () => {
    if (trashed && note.lastModification) {
      const trashDate = new Date(`${note.lastModification}Z`);
      const currentDate = new Date();

      const expirationDate = new Date(trashDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      const diffTime = expirationDate.getTime() - currentDate.getTime();

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays + 1 : 0;
    }
    return 0;
  };

  return (
    <div className="note-card-container" onDoubleClick={handleCardClick}  >
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
            {trashed && (
                <div className="time-left-indicator">
                  <span>Time left: </span>
                  {daysLeft()}
                  <span> day/s</span>
                </div>
              )}
            <div className="content">
              <h3>{note.title}</h3>
              <p className="note-text">
                {displayedText}
                {!expanded && isTextLong && "..."}
              </p>
              {isTextLong && (
                <button className="see-more-btn" onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
            </div>
            <div className="modification-date">
              <span><strong>Last modification:</strong></span>
              <span>
                {new Date(`${note.lastModification}Z`).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                })}
              </span>
            </div>
            <div className="categories">
              {note.categories.length === 0 ? (
                <em>No categories assigned</em>
              ) : (
                <>
                  <strong>Categories:</strong>
                  <div className="categories-list">
                      {note.categories.map((c, index) => (
                        <span key={index} className="category-item">
                          {c.name}
                        </span>
                      ))}
                  </div>
                </>
              )}
            </div>
            <div className="card-buttons-container">

              {trashed ? (
                <>
                  <button onClick={(e) => { e.stopPropagation(); onRestore(note.id); }}>Restore</button>
                  <button className="delete-btn"
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) {
                        onDeleteForever(note.id); 
                      }
                    }}>
                    Delete Forever
                  </button>
                </>
              ) : (
                <>
                {note.status === "ACTIVE" && (
                  <button onClick={(e) => { e.stopPropagation(); onChangeStatus(note.id, note.status) }}>Archive</button>
                )}
                {note.status === "ARCHIVED" && (
                  <button onClick={(e) => { e.stopPropagation(); onChangeStatus(note.id, note.status) }}>Unarchive</button>
                )}
                <button onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}>Edit</button>
                <button className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(note.id, note.status);
                  }}>
                  <img src={trashIcon} alt="Delete" />
                </button>
                </>
              )}  
            </div>
          </div>
        </>
      )}
    </div>
  );
}
