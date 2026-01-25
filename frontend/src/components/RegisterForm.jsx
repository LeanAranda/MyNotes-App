import { useState } from "react";
import "./Form.css";
import { useToast } from "./ToastMessage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterForm({ onSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { showMessage } = useToast();
    
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Unexpected error");
            }
            showMessage(`User '${username}' registered successfully`);
            onSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} autoComplete="off">
                <h2>Register</h2>
                <label>Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={15}
                    required
                    autoComplete="new-username"
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />
                <br />
                <button type="submit">Register</button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
}
