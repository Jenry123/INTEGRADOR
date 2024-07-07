const express = require('express');
const router = express.Router();
const detalleVentaController = require('../controllers/detalleVenta');

// Rutas para los endpoints CRUD de DetalleVenta
router.get('/', detalleVentaController.obtenerTodosLosDetallesDeVenta);
router.get('/:id', detalleVentaController.obtenerDetalleDeVentaPorId);
router.post('/agregarDetalleVenta', detalleVentaController.agregarDetalleDeVenta);
router.put('/:id', detalleVentaController.actualizarDetalleDeVenta);
router.delete('/:id', detalleVentaController.eliminarDetalleDeVenta);

module.exports = router;
