import React, { useState, useEffect } from "react";
import "./CategoryList.css";
import trashIcon from "../assets/trash-white.svg";
import checkIcon from "../assets/check-mark.svg";
const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const token = localStorage.getItem("token");

    const fetchCategories = async () => {
        try { 
            const res = await fetch(`${API_URL}/categories/myCategories`, {
                method: "GET",
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

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const res = await fetch(`${API_URL}/categories/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newCategory }),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            setNewCategory("");
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    }

    const handleSaveCategory = async (id, name) => {
        try {
            const res = await fetch(`${API_URL}/categories/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id, name }),
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            fetchCategories();
        }
        catch (err) {
            console.error(err);
        }
    }

    const handleDeleteCategory = async (id) => {
        try {
            const res = await fetch(`${API_URL}/categories/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Error ${res.status}`);
            fetchCategories();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="category-list-container">
            <div className="category-list-section">
                <div>
                    <form action="" className="category-form" onSubmit={handleAddCategory}>
                        <input 
                            type="text" 
                            placeholder="New Category" 
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            maxLength={20}
                            required
                        />
                        <button type="submit">+</button>
                    </form>
                </div>
            </div>
            <div className="category-list-section">
                {categories.map((category) => (
                    <div key={category.id}>
                        <form 
                            className="category-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveCategory(category.id, category.name);
                            }}
                        >
                            <input 
                                type="text" 
                                value={`${category.name}`} 
                                maxLength={20} 
                                onChange={(e) => {
                                    const updatedCategories = categories.map((c) =>
                                        c.id === category.id
                                            ? { ...c, name: e.target.value }
                                            : c
                                    );
                                    setCategories(updatedCategories);
                                }}
                                required
                            />
                            <button type="submit" className="save-btn">
                                <img src={checkIcon} alt="Save" />
                            </button>
                            <button 
                                className="delete-btn"
                                type="button"
                                onClick={() => handleDeleteCategory(category.id)}
                            >
                                <img src={trashIcon} alt="Delete" />
                            </button>
                        </form>
                    </div>
                ))}
            </div>
            
        </div>
    );
}