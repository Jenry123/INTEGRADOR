const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener todo el inventario
exports.obtenerTodoElInventario =[authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Inventario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener el inventario');
      throw err;
    }
    res.json(result);
  });
}];

// Agregar un nuevo producto en el inventario
exports.agregarInventario =[authenticateJWT, (req, res) => {
  const nuevoInventario = req.body;
  db.query('INSERT INTO Inventario (id_inventario, tipo_producto, id_producto, cantidad, descripcion) VALUES (?, ?, ?, ?, ?)',
    [nuevoInventario.id_inventario, nuevoInventario.tipo_producto, nuevoInventario.id_producto, nuevoInventario.cantidad, nuevoInventario.descripcion],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo producto al inventario');
        throw err;
      }
      res.status(201).send('Nuevo producto agregado correctamente');
    });
}];

// Actualizar un inventario existente
exports.actualizarInventario =[authenticateJWT, (req, res) => {
  const idInventario = req.params.id;
  const inventarioActualizado = req.body;
  db.query('UPDATE Inventario SET ? WHERE id_inventario = ?', [inventarioActualizado, idInventario], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el inventario');
      throw err;
    }
    res.send('Inventario actualizado correctamente');
  });
}];

// Eliminar un producto del inventario
exports.eliminarInventario =[authenticateJWT, (req, res) => {
  const idInventario = req.params.id;
  db.query('DELETE FROM Inventario WHERE id_inventario = ?', idInventario, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar un producto de el inventario');
      throw err;
    }
    res.send('Inventario eliminado correctamente');
  });
}];


