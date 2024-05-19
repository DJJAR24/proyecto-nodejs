const oracledb =require('oracledb')
//const  config = requiere( './confing');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_11_2' });


async function dbConnect() {
    try {
      await oracledb.createPool({
        user: 'db_proyecto_final',
        password: 'its',
        connectString: '127.0.0.1:1521/XE',
        poolAlias: 'default' // Define el alias de la piscina como "default"
      });
    
        console.log('Conexión exitosa');
     
     
    } catch (err) {
      console.error('Error al crear la piscina de conexiones:', err);
      throw err; // Lanza el error para que el servidor sepa que falló la conexión
    }
  }

  
async function execute(query, binds = [], options = {}) {
  let connection;
  options.outFormat = oracledb.OUT_FORMAT_OBJECT;

  try {
      connection = await oracledb.getConnection();
      const result = await connection.execute(query, binds, options);
      return result;
  } catch (err) {
      console.error('execute() error: ' + err.message);
      throw err;
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (err) {
              console.error('close() error: ' + err.message);
          }
      }
  }
}

module.exports=dbConnect;