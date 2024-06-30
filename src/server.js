const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const empleadosRoutes = require('./routes/empleados');
const administradoresRoutes = require('./routes/administradores');
const usuariosRoutes = require('./routes/usuario');
const proveedoresRoutes = require('./routes/proveedor');


// Usar rutas
app.use('/api/empleados', empleadosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
