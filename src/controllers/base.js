const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "l0p3z2005",
  database: "tortilleria_eveneser"
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

module.exports = db;
