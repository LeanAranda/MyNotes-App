import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import RegisterForm from './components/RegisterForm.jsx'
import NotesList from "./components/NotesList";
import TrashView from "./components/TrashBin.jsx";
import CategoryList from "./components/CategoryList.jsx";
import colorModeIcon from "./assets/color-mode-white.svg";
import { ToastProvider } from "./components/ToastMessage.jsx";

export default function App() {
  // state to track if the user is logged in
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [view, setView] = useState("notes")
  const [isYellowMode, setIsYellowMode] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
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
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
              {authMode === "login" ? "Register" : "Login"}
            </button>
          )}
        </div>
      </header>

        {logged && ( 
          <div className="nav-buttons"> 
            <button onClick={() => setView("notes")} className={view === "notes" ? "active-btn" : ""}>Notes</button> 
            <button onClick={() => setView("categories")} className={view === "categories" ? "active-btn" : ""}>Categories</button> 
            <button onClick={() => setView("trash")} className={view === "trash" ? "active-btn" : ""}>Trash</button> 
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
