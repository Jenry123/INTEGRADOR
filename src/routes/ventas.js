const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

// Rutas para los endpoints CRUD
router.get('/', ventasController.getAllUsers);
router.post('/', ventasController.addUser);
router.put('/:id', ventasController.updateUser);
router.delete('/:id', ventasController.deleteUser);

module.exports = router;



