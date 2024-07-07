const express = require('express');
const router = express.Router();
const maquinariaController = require('../controllers/Maquinaria');

// Rutas para los endpoints CRUD de Maquinaria
router.get('/', maquinariaController.obtenerTodaLaMaquinaria);
router.post('/agregarMaquinaria', maquinariaController.agregarMaquinaria);
router.put('/:id', maquinariaController.actualizarMaquinaria);
router.delete('/:id', maquinariaController.eliminarMaquinaria);

module.exports = router;
