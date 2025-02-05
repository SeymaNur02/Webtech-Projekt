const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Routen-Import
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const entryRoutes = require('./routes/entries'); // Hier importierst du die Datei

const app = express();

const helmet = require('helmet');
app.use(helmet());

// Middleware
app.use(bodyParser.json());

// Auth-Routen
app.use('/auth', authRoutes);

// Kategorien-Routen
app.use('/categories', categoryRoutes);

// Einträge-Routen
app.use('/entries', entryRoutes); // Hinzugefügt

// Fehlerbehandlung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Interner Serverfehler' });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
