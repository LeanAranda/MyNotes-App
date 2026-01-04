import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import NotesList from "./components/NotesList";
import colorModeIcon from "./assets/color-mode-white.svg";

export default function App() {
  // state to track if the user is logged in
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [view, setView] = useState("active")
  const [isYellowMode, setIsYellowMode] = useState(true);

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
  }

  const toggleMode = () => { setIsYellowMode(!isYellowMode); };

  return (
    <div className="page-container" style={{ backgroundColor: isYellowMode ? "#fde991" : "#ebebeb" }}>
      <header className="navbar">
        <h2>My Notes</h2>
        <div className='nav-buttons'>
          <button onClick={toggleMode}>
            <img src={colorModeIcon} width={32} height={32} alt="Toggle Color Mode" />
          </button>
          {logged && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>
        {logged ? (
          <>
            <main className="main-content-logged">
              <NotesList view={view} />
            </main>
          </>
          ) : (
            <main className="main-content">
              <LoginForm onSuccess={() => setLogged(true)} />
            </main>
          )}
      <footer className="footer">
        <p>© 2026 Lean Aranda</p>
      </footer>
    </div>
  );
}
