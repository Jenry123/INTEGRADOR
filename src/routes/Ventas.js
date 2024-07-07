const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas');

// Rutas para los endpoints CRUD de Ventas
router.get('/', ventasController.obtenerTodasLasVentas);
router.post('/agregarVenta', ventasController.agregarVenta);
router.put('/:id', ventasController.actualizarVenta);

module.exports = router;
