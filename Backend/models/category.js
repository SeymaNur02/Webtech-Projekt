const db = require('../db');

const Category = {
    getAll: (callback) => db.query('SELECT * FROM categories', callback),
    create: (name, callback) => db.query('INSERT INTO categories (name) VALUES (?)', [name], callback),
    delete: (id, callback) => db.query('DELETE FROM categories WHERE id = ?', [id], callback),
};

module.exports = Category;
