const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/user');

// Schema für Validierung der Eingabedaten
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Registrierung
exports.register = async (req, res) => {
    // Eingabedaten validieren
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    try {
        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Benutzer in der Datenbank erstellen
        User.create(username, hashedPassword, (err, result) => {
            if (err) {
                console.error('Datenbankfehler:', err);
                return res.status(500).json({ error: 'Datenbankfehler' });
            }
            res.status(201).json({
                message: 'Benutzer erfolgreich registriert',
                userId: result.insertId
            });
        });
    } catch (err) {
        console.error('Serverfehler:', err);
        res.status(500).json({ error: 'Serverfehler' });
    }
};

// Login
exports.login = async (req, res) => {
    // Eingabedaten validieren
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = req.body;

    try {
        // Benutzer anhand des Benutzernamens suchen
        User.findByUsername(username, async (err, results) => {
            if (err) {
                console.error('Datenbankfehler:', err);
                return res.status(500).json({ error: 'Datenbankfehler' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Benutzer nicht gefunden' });
            }

            const user = results[0];

            // Passwort überprüfen
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Ungültiges Passwort' });
            }

            // JWT-Token erstellen
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login erfolgreich',
                token
            });
        });
    } catch (err) {
        console.error('Serverfehler:', err);
        res.status(500).json({ error: 'Serverfehler' });
    }
};
