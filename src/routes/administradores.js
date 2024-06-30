const express = require('express');
const router = express.Router();
const administradoresController = require('../controllers/administradores');

// Rutas para los endpoints CRUD de Administradores
router.post('/', administradoresController.addAdmin);
router.get('/', administradoresController.getAllAdmins);
router.put('/:id', administradoresController.updateAdmin);
router.delete('/:id', administradoresController.deleteAdmin);

module.exports = router;
