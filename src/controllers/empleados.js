const db = require('./base');

// Obtener todos los empleados
exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM Empleados', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los empleados');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo empleado
exports.addEmployee = (req, res) => {
  const newEmployee = req.body;
  db.query('INSERT INTO Empleados (id_empleado, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?)',
    [newEmployee.id_empleado, newEmployee.nombre, newEmployee.apellidos, newEmployee.email, newEmployee.telefono],
    (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar un nuevo empleado');
        throw err;
      }
      res.status(201).send('Nuevo empleado agregado correctamente');
    });
};

// Actualizar un empleado existente
exports.updateEmployee = (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;
  db.query('UPDATE Empleados SET ? WHERE id_empleado = ?', [updatedEmployee, employeeId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el empleado');
      throw err;
    }
    res.send('Empleado actualizado correctamente');
  });
};

// Eliminar un empleado
exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.id;
  db.query('DELETE FROM Empleados WHERE id_empleado = ?', employeeId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el empleado');
      throw err;
    }
    res.send('Empleado eliminado correctamente');
  });
};
