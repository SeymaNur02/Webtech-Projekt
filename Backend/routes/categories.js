const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Kategorien-CRUD-Endpunkte
router.get('/', categoryController.getAllCategories); // Alle Kategorien abrufen
router.post('/', categoryController.createCategory); // Kategorie hinzufügen
router.delete('/:id', categoryController.deleteCategory); // Kategorie löschen

module.exports = router;

