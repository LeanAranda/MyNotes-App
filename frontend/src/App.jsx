import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'

export default function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem("token"));

  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
  }

  return (
    <div style={{ padding: 24 }}> 
      <h1>Notes</h1> 
      {logged ? (
        <> 
          <button onClick={handleLogout}>Logout</button> 
          <p>Welcome!</p>
        </>
        ) : (
          <LoginForm onSuccess={() => setLogged(true)} />
        )} 
    </div>
  );
}
