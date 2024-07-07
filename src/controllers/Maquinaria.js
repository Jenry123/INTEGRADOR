const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener toda la maquinaria
exports.obtenerTodaLaMaquinaria = [authenticateJWT,(req, res) => {
  db.query('SELECT * FROM Maquinaria', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener la maquinaria');
      throw err;
    }
    res.json(result);
  });
}];

// Agregar una nueva maquinaria
exports.agregarMaquinaria =[authenticateJWT, (req, res) => {
  const { id_maquinaria, nombre, descripcion, cantidad } = req.body;
  db.query('INSERT INTO Maquinaria (id_maquinaria, nombre, descripcion, cantidad) VALUES (?, ?, ?, ?)',
    [id_maquinaria, nombre, descripcion, cantidad],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar una nueva maquinaria');
        throw err;
      }
      res.status(201).send('Nueva maquinaria agregada correctamente');
    });
}];

// Actualizar una maquinaria existente
exports.actualizarMaquinaria = [authenticateJWT,(req, res) => {
  const idMaquinaria = req.params.id;
  const { nombre, descripcion, cantidad } = req.body;
  db.query('UPDATE Maquinaria SET nombre = ?, descripcion = ?, cantidad = ? WHERE id_maquinaria = ?',
    [nombre, descripcion, cantidad, idMaquinaria],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar la maquinaria');
        throw err;
      }
      res.send('Maquinaria actualizada correctamente');
    });
}];

// Eliminar una maquinaria
exports.eliminarMaquinaria =[authenticateJWT, (req, res) => {
  const idMaquinaria = req.params.id;
  db.query('DELETE FROM Maquinaria WHERE id_maquinaria = ?', [idMaquinaria], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar la maquinaria');
      throw err;
    }
    res.send('Maquinaria eliminada correctamente');
  });
}];
