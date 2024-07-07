const db = require('./base');
const authenticateJWT=require('./middleware/authMiddleware')
// Obtener todos los detalles de venta
exports.obtenerTodosLosDetallesDeVenta =[authenticateJWT, (req, res) => {
  db.query('SELECT * FROM DetalleVenta', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los detalles de venta');
      throw err;
    }
    res.json(result);
  });
}];

// Obtener un detalle de venta por ID
exports.obtenerDetalleDeVentaPorId =[authenticateJWT, (req, res) => {
  const idDetalleVenta = req.params.id;
  db.query('SELECT * FROM DetalleVenta WHERE id_detalle_venta = ?', [idDetalleVenta], (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener el detalle de venta');
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send('Detalle de venta no encontrado');
    } else {
      res.json(result[0]);
    }
  });
}];

// Agregar un nuevo detalle de venta
exports.agregarDetalleDeVenta =[authenticateJWT, (req, res) => {
  const { id_detalle_venta, id_venta, id_producto, cantidad, precio_unitario } = req.body;

  // Verificar que las claves foráneas existan
  db.query('SELECT * FROM Ventas WHERE id_venta = ?', [id_venta], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar la venta');
      throw err;
    }
    if (result.length === 0) {
      return res.status(400).send('El id de la venta no existe');
    }

    db.query('SELECT * FROM Inventario WHERE id_inventario = ?', [id_producto], (err, result) => {
      if (err) {
        res.status(500).send('Error al verificar el producto');
        throw err;
      }
      if (result.length === 0) {
        return res.status(400).send('El id del producto no existe');
      }

      // Insertar el nuevo detalle de venta
      db.query('INSERT INTO DetalleVenta (id_detalle_venta, id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
        [id_detalle_venta, id_venta, id_producto, cantidad, precio_unitario],
        (err, result) => {
          if (err) {
            res.status(500).send('Error al agregar un nuevo detalle de venta');
            throw err;
          }
          res.status(201).send('Nuevo detalle de venta agregado correctamente');
        });
    });
  });
}];

// Actualizar un detalle de venta existente
exports.actualizarDetalleDeVenta =[authenticateJWT, (req, res) => {
  const idDetalleVenta = req.params.id;
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

  // Verificar que las claves foráneas existan
  db.query('SELECT * FROM Ventas WHERE id_venta = ?', [id_venta], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar la venta');
      throw err;
    }
    if (result.length === 0) {
      return res.status(400).send('El id de la venta no existe');
    }

    db.query('SELECT * FROM Inventario WHERE id_inventario = ?', [id_producto], (err, result) => {
      if (err) {
        res.status(500).send('Error al verificar el producto');
        throw err;
      }
      if (result.length === 0) {
        return res.status(400).send('El id del producto no existe');
      }

      // Actualizar el detalle de venta
      db.query('UPDATE DetalleVenta SET id_venta = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle_venta = ?',
        [id_venta, id_producto, cantidad, precio_unitario, idDetalleVenta],
        (err, result) => {
          if (err) {
            res.status(500).send('Error al actualizar el detalle de venta');
            throw err;
          }
          res.send('Detalle de venta actualizado correctamente');
        });
    });
  });
}];

// Eliminar un detalle de venta
exports.eliminarDetalleDeVenta = [authenticateJWT,(req, res) => {
  const idDetalleVenta = req.params.id;
  db.query('DELETE FROM DetalleVenta WHERE id_detalle_venta = ?', [idDetalleVenta], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el detalle de venta');
      throw err;
    }
    res.send('Detalle de venta eliminado correctamente');
  });
}];
