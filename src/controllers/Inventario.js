const db = require('./base');
const authenticateJWT = require('./token/authMiddleware');

// Obtener todo el inventario
exports.obtenerTodoElInventario = (req, res) => {
  db.query('SELECT * FROM Inventario', (err, result) => {
    if (err) {
      console.error('Error al obtener el inventario:', err); // Log the error details
      res.status(500).json({ error: 'Error al obtener el inventario' });
      return; // Añadido return para evitar múltiples respuestas
    }
    res.json(result);
  });
};

// Agregar un nuevo producto en el inventario
exports.agregarInventario = (req, res) => {
  const nuevoInventario = req.body;
  db.query('INSERT INTO Inventario (id_inventario, tipo_producto, id_producto, cantidad, descripcion) VALUES (?, ?, ?, ?, ?)',
    [nuevoInventario.id_inventario, nuevoInventario.tipo_producto, nuevoInventario.id_producto, nuevoInventario.cantidad, nuevoInventario.descripcion],
    (err, result) => {
      if (err) {
        console.error('Error al agregar un nuevo producto al inventario:', err); // Log the error details
        res.status(500).json({ error: 'Error al agregar un nuevo producto al inventario' });
        return; // Añadido return para evitar múltiples respuestas
      }
      res.status(201).json({ message: 'Nuevo producto agregado correctamente' });
    });
};

// Actualizar un inventario existente
exports.actualizarInventario = (req, res) => {
  const idInventario = req.params.id;
  const inventarioActualizado = req.body;
  db.query('UPDATE Inventario SET ? WHERE id_inventario = ?', [inventarioActualizado, idInventario], (err, result) => {
    if (err) {
      console.error('Error al actualizar el inventario:', err); // Log the error details
      res.status(500).json({ error: 'Error al actualizar el inventario' });
      return; // Añadido return para evitar múltiples respuestas
    }
    res.json({ message: 'Inventario actualizado correctamente' });
  });
};

// Eliminar un producto del inventario
exports.eliminarInventario = (req, res) => {
  const idInventario = req.params.id;
  db.query('DELETE FROM Inventario WHERE id_inventario = ?', [idInventario], (err, result) => {
    if (err) {
      console.error('Error al eliminar un producto del inventario:', err); // Log the error details
      res.status(500).json({ error: 'Error al eliminar un producto del inventario' });
      return; // Añadido return para evitar múltiples respuestas
    }
    res.json({ message: 'Inventario eliminado correctamente' });
  });
};
