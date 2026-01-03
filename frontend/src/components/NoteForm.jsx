import React, { useState, useEffect } from "react";
import "./Form.css";

export default function NoteForm({ onCreate }) {
    const [title, setTitle] = useState(""); 
    const [text, setText] = useState(""); 
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => { 
        const fetchCategories = async () => { 
            try { 
                const res = await fetch("http://localhost:8080/categories/myCategories", { 
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

    const handleSubmit = () => { 
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea placeholder="Text" value={text} onChange={(e) => setText(e.target.value)}/>
                <div className="categories">
                    <strong>Categories:</strong>
                    {categories.map((cat) => (
                        <label key={cat.id} style={{ marginRight: "1rem" }}>
                            <input type="checkbox" checked={selectedCategories.includes(cat.id)} onChange={() => toggleCategory(cat.id)}/>
                            {cat.name}
                        </label>
                    ))}
                </div>
                <button type="submit">Create note</button>
            </form>
        </div>
    )
}