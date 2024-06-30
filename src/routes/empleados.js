const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleados');

// Rutas para los endpoints CRUD de Empleados
router.post('/', empleadosController.addEmployee);
router.get('/', empleadosController.getAllEmployees);
router.put('/:id', empleadosController.updateEmployee);
router.delete('/:id', empleadosController.deleteEmployee);

module.exports = router;
