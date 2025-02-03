const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '/Users/seymanur/IdeaProjects/Webtech-Projekt/SQLDetail.env'}); // Für Umgebungsvariablen

const app = express();
app.use(bodyParser.json());

// MySQL-Verbindung einrichten
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'crud_backend'
});

// Verbindung testen
db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
        process.exit(1);
    } else {
        console.log('Mit der MySQL-Datenbank verbunden!');
    }
});

// CRUD-Routen

// 1. CREATE: Eintrag hinzufügen
app.post('/entries', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title ist erforderlich' });
    }

    const sql = 'INSERT INTO entries (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title, description });
    });
});

// 2. READ: Alle Einträge anzeigen
app.get('/entries', (req, res) => {
    const sql = 'SELECT * FROM entries';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// 3. UPDATE: Eintrag ändern
app.put('/entries/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const sql = 'UPDATE entries SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        res.status(200).json({ id, title, description });
    });
});

// 4. DELETE: Eintrag löschen
app.delete('/entries/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM entries WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        res.status(200).json({ message: 'Eintrag gelöscht' });
    });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});