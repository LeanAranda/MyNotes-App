import React, { useState, useEffect } from "react";
import "./Form.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function NoteForm({ onCreate, onCancel }) {
    const [title, setTitle] = useState(""); 
    const [text, setText] = useState(""); 
    const [selectedCategories, setSelectedCategories] = useState([]);
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
                if (!res.ok) {
                    throw new Error(`Error ${res.status}`);
                } 
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
        onCreate({ 
            title, 
            text, 
            categoryIds: selectedCategories, 
        });
        setTitle(""); 
        setText(""); 
        setSelectedCategories([]);
    };

    return (
        <div className="note-form-container">

                <form onSubmit={handleSubmit}>
                    <div className="text-inputs">
                        <input 
                            type="text" 
                            placeholder="Title" 
                            maxLength={50} 
                            value={title} 
                            required 
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
                        <div>
                            {categories.map((cat) => (
                            <label key={cat.id} style={{ marginRight: "1rem" }}>
                            <input type="checkbox" checked={selectedCategories.includes(cat.id)} onChange={() => toggleCategory(cat.id)}/>
                            {cat.name}
                            </label>
                        ))}
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Create note</button>
                        <button type="button" onClick={(e) => {e.stopPropagation(); onCancel()}}>Cancel</button>
                    </div>
                </form>
            
        </div>
    )
}