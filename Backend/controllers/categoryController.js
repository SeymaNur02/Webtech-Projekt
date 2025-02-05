const db = require('../db');
const Joi = require('joi');

// Schema für Kategorievalidierung
const categorySchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
});

// Alle Kategorien abrufen
exports.getAllCategories = (req, res) => {
    const sql = 'SELECT * FROM categories';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Kategorien:', err.message);
            return res.status(500).json({ error: 'Fehler beim Abrufen der Kategorien' });
        }
        res.status(200).json(results);
    });
};

// Neue Kategorie erstellen
exports.createCategory = (req, res) => {
    // Validierung der Eingabedaten
    const { error } = categorySchema.validate(req.body);
    if (error) {
        console.warn('Ungültige Eingabedaten:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name } = req.body;

    const sql = 'INSERT INTO categories (name) VALUES (?)';

    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Fehler beim Erstellen der Kategorie:', err.message);
            return res.status(500).json({ error: 'Fehler beim Erstellen der Kategorie' });
        }
        res.status(201).json({ id: result.insertId, name });
    });
};

// Kategorie aktualisieren
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    // Validierung der Eingabedaten
    const { error } = categorySchema.validate({ name });
    if (error) {
        console.warn('Ungültige Eingabedaten:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const sql = 'UPDATE categories SET name = ? WHERE id = ?';

    db.query(sql, [name, id], (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren der Kategorie:', err.message);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren der Kategorie' });
        }

        if (result.affectedRows === 0) {
            console.warn('Kategorie mit der ID nicht gefunden:', id);
            return res.status(404).json({ error: 'Kategorie nicht gefunden' });
        }

        res.status(200).json({ message: 'Kategorie erfolgreich aktualisiert', id, name });
    });
};

// Kategorie löschen
exports.deleteCategory = (req, res) => {
    const { id } = req.params;

    if (!id) {
        console.warn('Kategorie-ID fehlt in der Anfrage');
        return res.status(400).json({ error: 'ID der Kategorie ist erforderlich' });
    }

    const sql = 'DELETE FROM categories WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen der Kategorie:', err.message);
            return res.status(500).json({ error: 'Fehler beim Löschen der Kategorie' });
        }

        if (result.affectedRows === 0) {
            console.warn('Kategorie mit der ID nicht gefunden:', id);
            return res.status(404).json({ error: 'Kategorie nicht gefunden' });
        }

        res.status(200).json({ message: 'Kategorie erfolgreich gelöscht' });
    });
};
