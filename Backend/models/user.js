const db = require('../db');

const User = {
    findByUsername: (username, callback) => db.query('SELECT * FROM users WHERE username = ?', [username], callback),
    create: (username, password, callback) => db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], callback),
};

module.exports = User;
