const db = require('./base');

// Obtener todos los administradores
exports.getAllAdmins = (req, res) => {
  db.query('SELECT * FROM Administradores', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los administradores');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo administrador
exports.addAdmin = (req, res) => {
  const newAdmin = req.body;
  db.query('INSERT INTO Administradores (id_admin, id_empleado) VALUES (?, ?)',
    [newAdmin.id_admin, newAdmin.id_empleado],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo administrador');
        throw err;
      }
      res.status(201).send('Nuevo administrador agregado correctamente');
    });
};

// Actualizar un administrador existente
exports.updateAdmin = (req, res) => {
  const adminId = req.params.id;
  const updatedAdmin = req.body;
  db.query('UPDATE Administradores SET ? WHERE id_admin = ?', [updatedAdmin, adminId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el administrador');
      throw err;
    }
    res.send('Administrador actualizado correctamente');
  });
};

// Eliminar un administrador
exports.deleteAdmin = (req, res) => {
  const adminId = req.params.id;
  db.query('DELETE FROM Administradores WHERE id_admin = ?', adminId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el administrador');
      throw err;
    }
    res.send('Administrador eliminado correctamente');
  });
};
