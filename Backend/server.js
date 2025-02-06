const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

// Routen-Import
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const entryRoutes = require('./routes/entries'); // Hier importierst du die Datei

const app = express();
const cors = require('cors');

const helmet = require('helmet');

// CORS aktivieren
app.use(cors());

// Sicherheit erhöhen
app.use(helmet());

// Statische Dateien im 'Frontend'-Ordner verfügbar machen
app.use(express.static(path.join(__dirname, '../Frontend'))); // Gehe eine Ebene nach oben zum Root-Verzeichnis und dann in den 'Frontend' Ordner

// Middleware
app.use(bodyParser.json());

// Root-Endpunkt hinzufügen
app.get('/', (req, res) => {
    res.send('Server läuft!');
});

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
