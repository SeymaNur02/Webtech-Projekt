document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token); // Token speichern
        alert("Login erfolgreich!");
        window.location.href = "index.html"; // Weiterleitung zur Hauptseite
    } else {
        alert("Fehler: " + data.error);
    }
});
