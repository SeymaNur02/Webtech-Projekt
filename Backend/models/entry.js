const db = require('../db');

const Entry = {
    getAll: (callback) => db.query('SELECT * FROM entries', callback),
    create: (title, description, price, category_id, callback) =>
        db.query('INSERT INTO entries (title, description, price, category_id) VALUES (?, ?, ?, ?)',
            [title, description, price, category_id], callback),
    update: (id, title, description, price, category_id, callback) =>
        db.query('UPDATE entries SET title = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
            [title, description, price, category_id, id], callback),
    delete: (id, callback) => db.query('DELETE FROM entries WHERE id = ?', [id], callback),
};

module.exports = Entry;

