const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener todas las ventas
exports.obtenerTodasLasVentas =[authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Ventas', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener las ventas');
      throw err;
    }
    res.json(result);
  });
}];

// Agregar una nueva venta
exports.agregarVenta = [authenticateJWT,(req, res) => {
  const nuevaVenta = req.body;
  db.query('INSERT INTO Ventas (id_venta, fecha, id_empleado, id_usuario, total) VALUES (?, ?, ?, ?, ?)',
    [nuevaVenta.id_venta, nuevaVenta.fecha, nuevaVenta.id_empleado, nuevaVenta.id_usuario, nuevaVenta.total],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar una nueva venta');
        throw err;
      }
      res.status(201).send('Nueva venta agregada correctamente');
    });
}];

// Actualizar una venta existente
exports.actualizarVenta = [authenticateJWT,(req, res) => {
  const idVenta = req.params.id;
  const ventaActualizada = req.body;
  db.query('UPDATE Ventas SET ? WHERE id_venta = ?', [ventaActualizada, idVenta], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar la venta');
      throw err;
    }
    res.send('Venta actualizada correctamente');
  });
}];
