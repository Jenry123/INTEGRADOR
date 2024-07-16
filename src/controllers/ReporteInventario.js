const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener todos los detalles de venta
exports.obtenerReportes =[authenticateJWT, (req, res) => {
  db.query('SELECT * FROM reporteInventario', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los detalles de venta');
      throw err;
    }
    res.json(result);
  });
}];

// Obtener un detalle de venta por ID
exports.obtenerReportePorId =[authenticateJWT, (req, res) => {
  const id_reporte_inventario = req.params.id;
  db.query('SELECT * FROM reporteInventario WHERE id_reporte_inventario = ?', [id_reporte_inventario], (err, result) => {
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
  const { id_reporte_inventario,fecha,id_inventario,id_admin } = req.body;

  // Verificar que las claves foráneas existan
  db.query('SELECT * FROM reporteInventario WHERE id_inventario = ?', [id_inventario], (err, result) => {
    if (err) {
      res.status(500).send('Error al verificar la venta');
      throw err;
    }
    if (result.length === 0) {
      return res.status(400).send('El id de la venta no existe');
    }

    const obtfecha = new Date();

   
    const fecha = obtfecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD


      // Insertar el nuevo detalle de venta
      db.query('INSERT INTO reporteInventario (id_reporte_inventario,fecha, id_inventario,id_admin) VALUES ( ?, ?, ?, ?)',
        [id_reporte_inventario,fecha, id_inventario,id_admin],
        (err, result) => {
          if (err) {
            res.status(500).send('Error al agregar un nuevo detalle de venta');
            throw err;
          }
          res.status(201).send('Nuevo detalle de venta agregado correctamente');
        });
    });

}];

