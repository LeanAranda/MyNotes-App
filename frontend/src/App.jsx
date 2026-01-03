import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import NotesList from "./components/NotesList";

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
  }

  return (
    <div className="page-container">
      <header className="header">
        <h1>Notes</h1>
      </header>

      <main className="main-content">
        {logged ? (
          <>
            <button onClick={handleLogout}>Logout</button>
            <p>Welcome!</p>
            <NotesList />
          </>
        ) : (
          <LoginForm onSuccess={() => setLogged(true)} />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Lean Aranda</p>
        {/* </footer> */}
      </footer>
    </div>
  );
}
