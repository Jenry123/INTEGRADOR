const mysql = require('mysql2');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateJWT=require('./token/authMiddleware')
const db = require('./base');



// Agregar un nuevo usuario
exports.addUser = (req, res) => {
  const newUser = req.body;
  bcrypt.hash(newUser.pass, 10, (err, hash) => {
    if (err) {
      if (!res.headersSent) {
        res.status(500).send('Error al hashear la contraseña');
      }
      return;
    }
    newUser.pass = hash;
    db.query('INSERT INTO Usuarios VALUES(?,?,?,?,?,?)',[newUser.id_usuario, newUser.nombre, newUser.apellidos, newUser.email, newUser.telefono, newUser.pass],
      (error, result) => {
        if (error) {
          if (!res.headersSent) {
            res.status(500).send('Error al agregar un nuevo usuario');
          }
          console.log(error);
          return;
        }
        if (!res.headersSent) {
          res.status(201).send('Nuevo usuario agregado correctamente');
        }
      });
  });
};
  
// Función para el login de usuarios
exports.login = async (req, res) => {
  const { email, pass } = req.body;
  db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      throw err;
    }
    if (result.length === 0) {
      return res.status(401).send('Credenciales inválidas');
    }
    const user = result[0];
    const validPassword = await bcrypt.compare(pass, user.pass);
    if (!validPassword) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    
  });
};


// Middleware de autenticación

exports.updateUser =[authenticateJWT, (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  db.query('UPDATE Usuarios SET ? WHERE id_usuario = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el usuario');
      throw err;
    }
    res.send('Usuario actualizado correctamente');
  });
}];

// Eliminar un usuario
exports.deleteUser = [authenticateJWT, (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM Usuarios WHERE id_usuario = ?', userId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el usuario');
      throw err;
    }
    res.send('Usuario eliminado correctamente');
  });
}];

// Obtener todos los usuarios
exports.getAllUsers = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Usuarios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
}];