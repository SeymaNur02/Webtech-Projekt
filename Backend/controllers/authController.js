const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registrierung
exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username und Passwort sind erforderlich' });
    }

    try {
        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Benutzer in der Datenbank erstellen
        User.create(username, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Datenbankfehler' });
            }
            res.status(201).json({ message: 'Benutzer erfolgreich registriert', userId: result.insertId });
        });
    } catch (err) {
        res.status(500).json({ error: 'Serverfehler' });
    }
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username und Passwort sind erforderlich' });
    }

    try {
        // Benutzer anhand des Benutzernamens suchen
        User.findByUsername(username, async (err, results) => {
            if (err || results.length === 0) {
                return res.status(401).json({ error: 'Benutzer nicht gefunden' });
            }

            const user = results[0];

            // Passwort überprüfen
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Ungültiges Passwort' });
            }

            // JWT-Token erstellen
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login erfolgreich', token });
        });
    } catch (err) {
        res.status(500).json({ error: 'Serverfehler' });
    }
};
