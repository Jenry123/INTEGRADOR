const express = require('express');
const router = express.Router();
const detalleServiciosController = require('../controllers/detalleServicios');

// Rutas para los endpoints CRUD de DetalleServicios
router.get('/', detalleServiciosController.obtenerTodosLosDetallesDeServicios);
router.get('/:id', detalleServiciosController.obtenerDetalleDeServicioPorId);
router.post('/agregarDetalleServicio', detalleServiciosController.agregarDetalleDeServicio);
router.put('/:id', detalleServiciosController.actualizarDetalleDeServicio);
router.delete('/:id', detalleServiciosController.eliminarDetalleDeServicio);

module.exports = router;
