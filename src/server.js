const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const empleadosRoutes = require('./routes/empleados');
const administradoresRoutes = require('./routes/administradores');
const usuariosRoutes = require('./routes/usuario');
const proveedoresRoutes = require('./routes/proveedor');
const serviciosRoutes = require('./routes/servicios');
const maquinariaRoutes = require('./routes/maquinaria');
const inventarioRoutes = require('./routes/inventarioRoutes');
const detalleVentaRoutes = require('./routes/detalleVentaRoutes');
const detalleServiciosRoutes = require('./routes/detallesServiciosRoutes');
const materiaPrima=require('./routes/MateriaPrima')
const ventaRotes=require('./routes/Ventas')
// Usar rutas
app.use('/api/empleados', empleadosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/materiaPrima', materiaPrima);
app.use('/api/maquinaria', maquinariaRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/detalleVenta', detalleVentaRoutes);
app.use('/api/detalleServicios', detalleServiciosRoutes);
app.use('/api/ventas',ventaRotes)
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
