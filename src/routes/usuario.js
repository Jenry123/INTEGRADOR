const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios');

// Rutas para los endpoints CRUD de Usuarios
router.post('/agregarUsuario', usuariosController.addUser);
router.get('/', usuariosController.getAllUsers);
router.put('/:id', usuariosController.updateUser);
router.delete('/:id', usuariosController.deleteUser);
router.get('/login', usuariosController.login)
module.exports = router;
