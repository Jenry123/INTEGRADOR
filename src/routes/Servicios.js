const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/servicios');

// Rutas para los endpoints CRUD de Servicios
router.get('/', serviciosController.getAllServices);
router.post('/agregarServicio', serviciosController.addService);
router.put('/:id', serviciosController.updateService);
router.delete('/:id', serviciosController.deleteService);

module.exports = router;
