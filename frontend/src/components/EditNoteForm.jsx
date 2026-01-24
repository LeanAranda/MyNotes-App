import React, { useState, useEffect } from "react";
import "./Form.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function EditNoteForm({ note, onUpdate, onCancel }) {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [selectedCategories, setSelectedCategories] = useState(
    note.categories.map((c) => c.id)
  );
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

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
  }, [token]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      id: note.id,
      title,
      text,
      categoryIds: selectedCategories,
    });
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit}>
        <div className="text-inputs">
          <input
            type="text"
            placeholder="Title"
            required
            maxLength={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Text"
            maxLength={510}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="categories">
          <strong>Categories:</strong>
          <div className="categories-container">
            {categories.length === 0 ? (
                    <h4>No categories available</h4>
                ) : (
            categories.map((cat) => (
              <div key={cat.id}>
                <label style={{ marginRight: "1rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <span> </span>{cat.name}
                </label>
              </div>
                )))}
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
