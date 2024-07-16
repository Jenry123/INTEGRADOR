const db = require('./base');
require('dotenv').config();
const authenticateJWT = require('./token/authMiddleware');

// Obtener todos los empleados
exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM Empleados', (err, result) => {
    if (err) {
      console.error('Error al obtener los empleados:', err);
      return res.status(500).send('Error al obtener los empleados');
    }
    res.json(result);
  });
};

// Agregar un nuevo empleado
exports.addEmployee = (req, res) => {
  const newEmployee = req.body;
  db.query(
    'INSERT INTO Empleados (id_empleado, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?)',
    [newEmployee.id_empleado, newEmployee.nombre, newEmployee.apellidos, newEmployee.email, newEmployee.telefono],
    (err, result) => {
      if (err) {
        console.error('Error al agregar un nuevo empleado:', err);
        return res.status(500).send('Error al agregar un nuevo empleado');
      }
      res.status(201).send('Nuevo empleado agregado correctamente');
    }
  );
};

// Actualizar un empleado existente
exports.updateEmployee = (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployee = req.body;
  db.query('UPDATE Empleados SET ? WHERE id_empleado = ?', [updatedEmployee, employeeId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el empleado:', err);
      return res.status(500).send('Error al actualizar el empleado');
    }
    res.send('Empleado actualizado correctamente');
  });
};

// Eliminar un empleado
exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.id;
  db.query('DELETE FROM Empleados WHERE id_empleado = ?', employeeId, (err, result) => {
    if (err) {
      console.error('Error al eliminar el empleado:', err);
      return res.status(500).send('Error al eliminar el empleado');
    }
    res.send('Empleado eliminado correctamente');
  });
};
