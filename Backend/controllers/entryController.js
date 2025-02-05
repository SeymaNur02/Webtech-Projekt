const Entry = require('../models/entry');
const Joi = require('joi');

// Schema für Eingabedatenvalidierung
const entrySchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().positive().required(),
    category_id: Joi.number().integer().positive().required(),
});

// Alle Einträge abrufen
exports.getAllEntries = (req, res) => {
    Entry.getAll((err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Einträge:', err.message);
            return res.status(500).json({ error: 'Fehler beim Abrufen der Einträge' });
        }
        res.status(200).json(results);
    });
};

// Neuen Eintrag erstellen
exports.createEntry = (req, res) => {
    // Validierung der Eingabedaten
    const { error } = entrySchema.validate(req.body);
    if (error) {
        console.warn('Ungültige Eingabedaten:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description, price, category_id } = req.body;

    Entry.create(title, description, price, category_id, (err, result) => {
        if (err) {
            console.error('Fehler beim Erstellen des Eintrags:', err.message);
            return res.status(500).json({ error: 'Fehler beim Erstellen des Eintrags' });
        }
        res.status(201).json({ id: result.insertId, title, description, price, category_id });
    });
};

// Eintrag aktualisieren
exports.updateEntry = (req, res) => {
    const { id } = req.params;

    // Validierung der Eingabedaten
    const { error } = entrySchema.validate(req.body);
    if (error) {
        console.warn('Ungültige Eingabedaten:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    const { title, description, price, category_id } = req.body;

    Entry.update(id, title, description, price, category_id, (err, result) => {
        if (err) {
            console.error('Fehler beim Aktualisieren des Eintrags:', err.message);
            return res.status(500).json({ error: 'Fehler beim Aktualisieren des Eintrags' });
        }

        if (result.affectedRows === 0) {
            console.warn('Eintrag mit der ID nicht gefunden:', id);
            return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        }

        res.status(200).json({ message: 'Eintrag erfolgreich aktualisiert', id, title, description, price, category_id });
    });
};

// Eintrag löschen
exports.deleteEntry = (req, res) => {
    const { id } = req.params;

    Entry.delete(id, (err, result) => {
        if (err) {
            console.error('Fehler beim Löschen des Eintrags:', err.message);
            return res.status(500).json({ error: 'Fehler beim Löschen des Eintrags' });
        }

        if (result.affectedRows === 0) {
            console.warn('Eintrag mit der ID nicht gefunden:', id);
            return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        }

        res.status(200).json({ message: 'Eintrag erfolgreich gelöscht' });
    });
};
