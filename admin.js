const mysql = require('mysql2');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
  host: "pruebita.cse8lgxoz3uk.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "l0p3z2005",
  database: "administradores"
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Users-Conexión a la BD establecida');
});


exports.addAdmin = (req, res) => {
  const newUser = req.body;

  bcrypt.hash(newUser.pass, 10, (err, hash) => { 
    if (err) {
      res.status(500).send('Error al hashear la contraseña');
      return; 
    }
    newUser.pass = hash;  

    db.query('INSERT INTO admins Values(?,?,?,?)',[newUser.id_admin,newUser.nombre,newUser.email,newUser.pass], (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        console.log(err);
      return;
      }
      res.status(201).send('Usuario agregado correctamente');
    });
 
  });
};

exports.login = async (req, res) => {
  const { nombre,pass } = req.body;
  db.query('SELECT * FROM admins WHERE nombre = ?', [nombre],  async (err, result) => {
    if (err) {
      res.status(500).send('Error en el servidor');
      throw err;
    }
    if (result.length === 0) {
      return res.status(401).send('Credenciales inválidas');
    }
    const user = result[0];
    // Verificar contraseña (con bcrypt)
    const validPassword = await bcrypt.compare(pass, user.pass);
    if (!validPassword) {
      return res.status(401).send('Credenciales inválidas');
    }
    // Generar JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};  
// Middleware de autenticación
 const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Prohibido (token inválido)
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No autorizado (sin token)
  }
};




exports.updateAdmin =[authenticateJWT, (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  if (updatedUser.pass) {
    try {
      updatedUser.pass =bcrypt.hash(updatedUser.pass, 10);
    } catch (err) {
      res.status(500).send('Error al hashear la contraseña');
      return;
    }
  } 

  db.query('UPDATE admins SET ? WHERE id_admin = ?', [updatedUser, userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el elemento');
      console.log(err);
      return;
    }
    res.send('Elemento actualizado correctamente');
  });
}];


exports.deleteUser =[authenticateJWT, (req, res) => {
  const userId = req.params.id;
  const deletedUser = req.body;
  db.query('DELETE FROM admins WHERE id_admin = ?', [deletedUser,userId], (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el elemento');
      console.log(err);
      return;
    }
    res.send('Elemento eliminado correctamente');
  });
}];


exports.getAllAdmins = [authenticateJWT, (req, res) => {
  db.query('SELECT * FROM admins', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los usuarios');
      throw err;
    }
    res.json(result);
  });
}];


// PUBLICACIONES


exports.addPublications = (req, res) => {
  const newUser = req.body;

    db.query('INSERT INTO publicaciones Values(?,?,?,?)',[newUser.id,newUser.titulo,newUser.contenido,newUser.id_ad], (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el usuario');
        console.log(err)
      return;
      }
      res.status(201).send('Usuario agregado correctamente');
    });
  };

  exports.updatePublications =[authenticateJWT, (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.query('UPDATE publicaciones SET ? WHERE id = ?', [updatedUser, userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al actualizar el elemento');
        console.log(err);
        return;
      }
      res.send('Elemento actualizado correctamente');
    });
  }];
  
  
  exports.deletePublications =[authenticateJWT, (req, res) => {
    const userId = req.params.id;
    const deletedUser = req.body;
    db.query('DELETE FROM publicaciones WHERE id= ?', [deletedUser,userId], (err, result) => {
      if (err) {
        res.status(500).send('Error al eliminar el elemento');
        console.log(err);
        return;
      }
      res.send('Elemento eliminado correctamente');
    });
  }];
  
  
  exports.getAllPublications = [authenticateJWT, (req, res) => {
    db.query('SELECT * FROM publicaciones', (err, result) => {
      if (err) {
        res.status(500).send('Error al obtener los usuarios');
        throw err;
      }
      res.json(result);
    });
  }];