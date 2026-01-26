import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import NotesList from "./components/NotesList";
import TrashView from "./components/TrashBin.jsx";
import CategoryList from "./components/CategoryList.jsx";
import UserMenu from "./components/UserMenu.jsx";
import colorModeIcon from "./assets/color-mode-white.svg";
import notesIcon from "./assets/notesR.svg";
import categoryIcon from "./assets/categoryR.svg";
import trashIcon from "./assets/trashR.svg";
import { ToastProvider } from "./components/ToastMessage.jsx";
const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  // state to track if the user is logged in
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [view, setView] = useState("notes")
  const [isYellowMode, setIsYellowMode] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLogged(false);
  }

  function handleDeleteAccount() {
    try {
      const token = localStorage.getItem("token");
      fetch(`${API_URL}/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        handleLogout();
      });
    } catch (err) {
      console.error(err);
    }
  }

  const toggleMode = () => { setIsYellowMode(!isYellowMode); };

  return (
    <ToastProvider>
    <div className="page-container" style={{ backgroundColor: isYellowMode ? "#fde991" : "#ebebeb" }}>
      <header className="navbar">
        <h2>My Notes</h2>
        <div className='nav-buttons'>
          <button onClick={toggleMode}>
            <img src={colorModeIcon} width={32} height={32} alt="Toggle Color Mode" />
          </button>
          {logged ? (
            <UserMenu 
              username={localStorage.getItem("username")}
              onLogout={handleLogout} 
              onDeleteAccount={handleDeleteAccount} 
            />
          ) : (
            <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? "Register" : "Login"}
            </button>
          )}
        </div>
      </header>

        {logged && ( 
          <div className="nav-buttons"> 
            <button onClick={() => setView("notes")} className={view === "notes" ? "active-btn" : ""}>
              Notes
              <img src={notesIcon} width={30} height={30} alt="Notes" />  
            </button> 
            <button onClick={() => setView("categories")} className={view === "categories" ? "active-btn" : ""}>
              Categories
              <img src={categoryIcon} width={30} height={30} alt="Categories" />
            </button> 
            <button onClick={() => setView("trash")} className={view === "trash" ? "active-btn" : ""}>
              Trash
              <img src={trashIcon} width={30} height={30} alt="Trash" />
            </button> 
          </div> )}

        {logged ? (
          <>
            <main className="main-content-logged">
              {view === "notes" && <NotesList view="active" />} 
              {view === "categories" && <CategoryList />}
              {view === "trash" && <TrashView />}
            </main>
          </>
          ) : (
            <main className="main-content">
              {authMode === "login" ? (
                <LoginForm onSuccess={() => setLogged(true)} />
              ) : (
                <RegisterForm onSuccess={() => setAuthMode("login")} />
              )}
            </main>
          )}
      <footer className="footer">
        <p>© 2026 Lean Aranda</p>
      </footer>
    </div>
    </ToastProvider>
  );
}
