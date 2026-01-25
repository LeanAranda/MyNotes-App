import { useState } from "react";
import "./Form.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm({ onSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                throw new Error("Invalid credentials");
            }
            const data = await res.json();
            // saves the token in localStorage
            localStorage.setItem("token", data.token);
            // saves the username in localStorage
            localStorage.setItem("username", username);
            onSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={15}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
}
