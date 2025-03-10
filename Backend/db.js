const mysql = require('mysql2');
require('dotenv').config({ path: '/Users/seymanur/IdeaProjects/Webtech-Projekt/SQLDetail.env' });

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'parfum_shop'
});

db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
        process.exit(1);
    } else {
        console.log('✅ Mit der MySQL-Datenbank verbunden!');
    }
});

module.exports = db;
