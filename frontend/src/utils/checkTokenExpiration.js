const API_URL = import.meta.env.VITE_API_URL;

export async function checkTokenExpiration(handleLogout) {
  try {
    const res = await fetch(`${API_URL}/auth/check`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json(); 
    if (data.status === "invalid") { 
        alert("Session expired. Please log in again.");
        handleLogout();
    }
  } catch (error) {
    handleLogout();
  }
}

