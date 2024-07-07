const db = require('./base');
const authenticateJWT=require('./token/authMiddleware')
// Obtener todos los servicios
exports.getAllServices =[authenticateJWT, (req, res) => {
  db.query('SELECT * FROM Servicios', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los servicios');
      throw err;
    }
    res.json(result);
  });
}];

// Agregar un nuevo servicio
exports.addService =[authenticateJWT, (req, res) => {
  const newService = req.body;
  db.query('INSERT INTO Servicios (id_servicio, nombre, descripcion, id_proveedor) VALUES (?, ?, ?, ?)',
    [newService.id_servicio, newService.nombre, newService.descripcion, newService.id_proveedor],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo servicio');
        throw err;
      }
      res.status(201).send('Nuevo servicio agregado correctamente');
    });
}];

// Actualizar un servicio existente
exports.updateService = [authenticateJWT,(req, res) => {
  const serviceId = req.params.id;
  const updatedService = req.body;
  db.query('UPDATE Servicios SET ? WHERE id_servicio = ?', [updatedService, serviceId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el servicio');
      throw err;
    }
    res.send('Servicio actualizado correctamente');
  });
}];

// Eliminar un servicio
exports.deleteService = [authenticateJWT,(req, res) => {
  const serviceId = req.params.id;
  db.query('DELETE FROM Servicios WHERE id_servicio = ?', serviceId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el servicio');
      throw err;
    }
    res.send('Servicio eliminado correctamente');
  });
}];
