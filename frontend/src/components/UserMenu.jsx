import { useState } from "react";
import userIcon from "../assets/user.svg";
import logoutIcon from "../assets/logout.svg";
import "./UserMenu.css";
import { useToast } from "./ToastMessage.jsx";

export default function UserMenu({ username, onLogout, onDeleteAccount }) {
  const [open, setOpen] = useState(false);
  const { showMessage } = useToast();

  return (
    <div className="user-menu">
      <button onClick={() => setOpen(!open)} className="user-btn">
        {username}
        <img src={userIcon} alt="User Icon" width={32} height={32} />
      </button>

      {open && (
        <div className={`dropdown ${open ? "show" : ""}`}>
          <button className="dropdown-item">Change Password</button>
          <button className="dropdown-item" 
            onClick={(e) => { 
              e.stopPropagation();
              if (window.confirm("Are you sure you want to delete your account? This action cannot be undone."))
                onDeleteAccount(); 
                showMessage("Account deleted successfully");
              }
            } 
          >
            Delete Account
          </button>
          <button className="dropdown-item" id="logout-btn" onClick={onLogout}>
            Logout
            <img src={logoutIcon} alt="Logout Icon" width={25} height={25} />
            </button>
        </div>
      )}
    </div>
  );
}
