export function checkTokenExpiration(handleLogout) {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const exp = payload.exp * 1000; //s → ms
            if (Date.now() > exp) {
                alert("Session expired. Please log in again.");
                handleLogout();
                return true;
            }
        } catch {
            alert("Session expired. Please log in again.");
            handleLogout();
            return true;
        }
    }
    return false;
}
