import { useState } from "react";
import "./Form.css";
import showPIcon from "../assets/show.png";
import hidePIcon from "../assets/hide.png";
import { useToast } from "./ToastMessage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function RegisterForm({ onSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { showMessage } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include"
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
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                    <button type="button" className="toggle-password-btn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <img src={hidePIcon} alt="Hide" /> : <img src={showPIcon} alt="Show" />}
                    </button>
                </div>
                <br />
                <button type="submit">Register</button>
                {error && <span className="error">{error}</span>}
            </form>
        </div>
    );
}
