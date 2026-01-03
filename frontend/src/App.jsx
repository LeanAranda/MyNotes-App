import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import NotesList from "./components/NotesList";

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));
  const [view, setView] = useState("active")

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
  }

  return (
    <div className="page-container">
      <header className="navbar">
        <h2>My Notes</h2>
        {logged && <button onClick={handleLogout}>Logout</button>}
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
        {/* </footer> */}
      </footer>
    </div>
  );
}
