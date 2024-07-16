const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener todos los detalles de servicios
exports.obtenerTodosLosDetallesDeServicios = (req, res) => {
  db.query('SELECT * FROM DetalleServicios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los detalles de servicios');
      throw err;
    }
    res.json(result);
  });
};

// Obtener un detalle de servicio por ID
exports.obtenerDetalleDeServicioPorId = (req, res) => {
  const idDetalleServicio = req.params.id;
  db.query('SELECT * FROM DetalleServicios WHERE id_detalle_servicio = ?', [idDetalleServicio], (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener el detalle de servicio');
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send('Detalle de servicio no encontrado');  
    } else {
      res.json(result[0]);
    }
  });
};

// Agregar un nuevo detalle de servicio
exports.agregarDetalleDeServicio = (req, res) => {
  const { id_detalle_servicio, id_servicio, id_venta, costo } = req.body;

  // Verificar que las claves foráneas existan
  db.query('SELECT * FROM Servicios WHERE id_servicio = ?', [id_servicio], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar el servicio');
      throw err;
    }
    if (result.length === 0) {
      return res.status(400).send('El id del servicio no existe');
    }

    db.query('SELECT * FROM Ventas WHERE id_venta = ?', [id_venta], (err, result) => {
      if (err) {
        res.status(500).send('Error al verificar la venta');
        throw err;
      }
      if (result.length === 0) {
        return res.status(400).send('El id de la venta no existe');
      }

      // Insertar el nuevo detalle de servicio
      db.query('INSERT INTO DetalleServicios (id_detalle_servicio, id_servicio, costo) VALUES (?, ?, ?, ?)',
        [id_detalle_servicio, id_servicio, costo],
        (err, result) => {
          if (err) {
            res.status(500).send('Error al agregar un nuevo detalle de servicio');
            throw err;
          }
          res.status(201).send('Nuevo detalle de servicio agregado correctamente');
        });
    });
  });
};

// Actualizar un detalle de servicio existente
exports.actualizarDetalleDeServicio = (req, res) => {
  const idDetalleServicio = req.params.id;
  const { id_servicio, costo } = req.body;

  // Verificar que las claves foráneas existan
  db.query('SELECT * FROM Servicios WHERE id_servicio = ?', [id_servicio], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar el servicio');
      throw err;
    }
    if (result.length === 0) {
      return res.status(400).send('El id del servicio no existe');
    }

    db.query('SELECT * FROM Ventas WHERE id_venta = ?', [id_venta], (err, result) => {
      if (err) {
        res.status(500).send('Error al verificar la venta');
        throw err;
      }
      if (result.length === 0) {
        return res.status(400).send('El id de la venta no existe');
      }

      // Actualizar el detalle de servicio
      db.query('UPDATE DetalleServicios SET id_servicio = ?, id_venta = ?, costo = ? WHERE id_detalle_servicio = ?',
        [id_servicio, id_venta, costo, idDetalleServicio],
        (err, result) => {
          if (err) {
            res.status(500).send('Error al actualizar el detalle de servicio');
            throw err;
          }
          res.send('Detalle de servicio actualizado correctamente');
        });
    });
  });
};

// Eliminar un detalle de servicio
exports.eliminarDetalleDeServicio =(req, res) => {
  const idDetalleServicio = req.params.id;
  db.query('DELETE FROM DetalleServicios WHERE id_detalle_servicio = ?', [idDetalleServicio], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el detalle de servicio');
      throw err;
    }
    res.send('Detalle de servicio eliminado correctamente');
  });
};


