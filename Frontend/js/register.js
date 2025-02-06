document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert("Registrierung erfolgreich! Jetzt einloggen.");
        window.location.href = "login.html"; // Weiterleitung zum Login
    } else {
        alert("Fehler: " + data.error);
    }
});
