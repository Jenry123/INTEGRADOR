const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/Inventario');

// Rutas para los endpoints CRUD de Inventario
router.get('/', inventarioController.obtenerTodoElInventario);
router.post('/agregarInventario', inventarioController.agregarInventario);
router.put('/:id', inventarioController.actualizarInventario);
router.delete('/:id', inventarioController.eliminarInventario);

module.exports = router;
