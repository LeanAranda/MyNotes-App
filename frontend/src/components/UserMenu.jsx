import { useState } from "react";
import userIcon from "../assets/user.svg";
import logoutIcon from "../assets/logout.svg";
import "./UserMenu.css";
import "./Form.css";
import { useToast } from "./ToastMessage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserMenu({ username, onLogout, onDeleteAccount }) {
  const [open, setOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const { showMessage } = useToast();
  
  const token = localStorage.getItem("token");

  async function handleChangePassword(e) {
    e.preventDefault();
    setError("");

    if (!oldPassword || !newPassword) { 
      setError("Please fill in all fields");
      return; 
    }
    if (oldPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }
    
    try{
      const res = await fetch(`${API_URL}/users/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error("Error: " + (errorData.error || "Failed to change password"));
      }
      showMessage("Password changed successfully");
      setShowChangePassword(false);
      setOldPassword("");
      setNewPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="user-menu">
      <button onClick={() => setOpen(!open)} className="user-btn">
        {username}
        <img src={userIcon} alt="User Icon" width={32} height={32} />
      </button>

      {open && (
        <div className={`dropdown ${open ? "show" : ""}`}>
          {!showChangePassword ? (
            <>
              <button className="dropdown-item" onClick={() => setShowChangePassword(true)}>Change Password</button>
              <button className="dropdown-item" id="delete-account-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                    onDeleteAccount();
                    showMessage("Account deleted successfully");
                  }
                }
                }
              >
                Delete Account
              </button>
              <button className="dropdown-item" onClick={onLogout}>
                Logout
                <img src={logoutIcon} alt="Logout Icon" width={25} height={25} />
              </button>
            </>
          ) : (
            <div className="change-password-form-container">
              <form className="change-password-form" onSubmit={handleChangePassword}>
                <strong>Change Password</strong>
                <input type="password" placeholder="Current password" 
                  value={oldPassword} 
                  required
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input type="password" placeholder="New password" 
                  value={newPassword} 
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="form-actions">
                  <button type="submit">
                    Save
                  </button>
                  <button type="button" onClick={() => setShowChangePassword(false)}>
                    Cancel
                  </button>
                </div>
              </form>
              {error && <span className="error">{error}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
