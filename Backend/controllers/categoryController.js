const db = require('../db');

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
    const { name } = req.body;

    if (!name) {
        console.warn('Kategorie-Name fehlt in der Anfrage');
        return res.status(400).json({ error: 'Name der Kategorie ist erforderlich' });
    }

    const sql = 'INSERT INTO categories (name) VALUES (?)';

    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Fehler beim Erstellen der Kategorie:', err.message);
            return res.status(500).json({ error: 'Fehler beim Erstellen der Kategorie' });
        }
        res.status(201).json({ id: result.insertId, name });
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
