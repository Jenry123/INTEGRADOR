const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores');

// Rutas para los endpoints CRUD de Proveedores
router.post('/', proveedoresController.addSupplier);
router.get('/', proveedoresController.getAllSuppliers);
router.put('/:id', proveedoresController.updateSupplier);
router.delete('/:id', proveedoresController.deleteSupplier);

module.exports = router;
