function checkLoginStatus() {
    const token = localStorage.getItem("token");
    const loginContainer = document.getElementById("loginContainer");

    if (token) {
        loginContainer.innerHTML = `<p>Eingeloggt | <a href="#" onclick="logout()">Logout</a></p>`;
    } else {
        loginContainer.innerHTML = `<a href="login.html">Login</a> | <a href="register.html">Registrieren</a>`;
    }
}

function logout() {
    localStorage.removeItem("token");
    alert("Logout erfolgreich!");
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", checkLoginStatus);
