const Entry = require('../models/entry');

exports.getAllEntries = (req, res) => {
    Entry.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

exports.createEntry = (req, res) => {
    const { title, description, price, category_id } = req.body;
    if (!title || !description || !price || !category_id) {
        return res.status(400).json({ error: 'Alle Felder (title, description, price, category_id) sind erforderlich' });
    }

    Entry.create(title, description, price, category_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title, description, price, category_id });
    });
};

exports.updateEntry = (req, res) => {
    const { title, description, price, category_id } = req.body;
    const { id } = req.params;

    if (!title || !description || !price || !category_id) {
        return res.status(400).json({ error: 'Alle Felder (title, description, price, category_id) sind erforderlich' });
    }

    Entry.update(id, title, description, price, category_id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        res.status(200).json({ message: 'Eintrag aktualisiert' });
    });
};

exports.deleteEntry = (req, res) => {
    const { id } = req.params;

    Entry.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Eintrag nicht gefunden' });
        res.status(200).json({ message: 'Eintrag gelöscht' });
    });
};
