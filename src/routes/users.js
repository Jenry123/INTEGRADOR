const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Rutas para los endpoints CRUD
router.get('/', usersController.getAllUsers);
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;



