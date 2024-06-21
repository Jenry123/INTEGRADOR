const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const usersJWTRoutes = require('./routes/users_jwt');
const ventasRoutes = require('./routes/ventas')
require('dotenv').config();
const app = express();
const port = process.env.DB_PORT || 3000;

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());
  
// Usar las rutas de los items
app.use('/users', usersRoutes);
app.use('/usersJWT', usersJWTRoutes);
app.use('/ventas',ventasRoutes)

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
