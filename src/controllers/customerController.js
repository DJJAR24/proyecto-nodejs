
const oracledb = require('oracledb');
const dbConfig = require('../database/dbconfig'); // Asegúrate de que la ruta sea correcta
// rutas del usuario
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const controller = {}; // Define el objeto controller
// Función para insertar en la tabla EDITORIALES
controller.addEditorial = async (req, res) => {
    let connection;
    try {
      const { editorial_id, nombre_edit } = req.body;
  
      if (!editorial_id || !nombre_edit) {
        return res.status(400).json({ error: "Datos incompletos en la solicitud" });
      }
  
      console.log('Datos recibidos:', req.body); // Agrega esto para depurar
  
      // Obtiene una conexión a la base de datos
      connection = await oracledb.getConnection(dbConfig);
      
  
      // Ejecuta la consulta SQL para insertar una nueva editorial
      const result = await connection.execute(
        'INSERT INTO EDITORIALES (editorial_id, nombre_edit) VALUES (:editorial_id, :nombre_edit)',
        { editorial_id, nombre_edit },
        { autoCommit: true }
      );
  
      console.log('Resultado de la inserción:', result);
  
      // Redirige a una página de confirmación o lista de editoriales después de una inserción exitosa
      res.redirect('/');
    } catch (err) {
      console.error('Error en la inserción:', err);
      res.status(500).json({ error: err.message }); // Maneja los errores de manera adecuada
    } finally {
      if (connection) {
        console.log('Conexión a la base de datos establecida');
        try {
          await connection.close(); // Cierra la conexión después de usarla
          console.log('Conexión a la base de datos cerrada');
        } catch (err) {
          console.error('Error al cerrar la conexión:', err);
        }
      }
    }
  };


controller.addLibro = async (req, res) => {
  let connection;
  try {
    const { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas } = req.body;

    if (!libro_id || !editorial_id || !categoria_id || !autor_id || !titulo || !paginas) {
      return res.status(400).json({ error: "Datos incompletos en la solicitud" });
    }
    try {
      
      console.log('Datos recibidos:', req.body); // Agrega esto para depurar
  
      // Obtiene una conexión a la base de datos
      connection = await oracledb.getConnection(dbConfig);
      console.log('Conexión a la base de datos establecida');
          console.log('Conexión exitosa');

    // Depuración: muestra el objeto de parámetros
    const params = { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas };
    console.log('Parámetros de la consulta:', params);

    // Ejecuta la consulta SQL para insertar un nuevo libro
    const result = await connection.execute(
      `INSERT INTO LIBROS (libro_id, editorial_id, categoria_id, autor_id, titulo, paginas)
       VALUES (:libro_id, :editorial_id, :categoria_id, :autor_id, :titulo, :paginas)`,
      params,
      { autoCommit: true }
    );
  
    } catch (err) {
      console.error('Error  de conexiones:', err);
      throw err; // Lanza el error para que el servidor sepa que falló la conexión
    }
    console.log('Resultado de la inserción:', result);

    // Redirige a una página de confirmación o lista de libros después de una inserción exitosa
    res.redirect('/');
  } catch (err) {
    console.error('Error en la inserción:', err);
    res.status(500).json({ error: err.message }); // Maneja los errores de manera adecuada
  } finally {
    if (connection) {
      try {
        await connection.close(); // Cierra la conexión después de usarla
        console.log('Conexión a la base de datos cerrada');
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
};

// Exporta el controlador
module.exports = controller;