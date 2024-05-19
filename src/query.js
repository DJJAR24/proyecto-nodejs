const dbConnect = require('./database/connection');
const oracledb =require('oracledb');
const { connect } = require('./routes/customer');

async function ShowLibros() {
    let connection;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

    try {
        connection = await oracledb.getConnection();
        const query = 'SELECT * FROM LIBROS';
        const result = await connection.execute(query);

        if (result.rows.length === 0) {
            return { message: 'No hay libros' }; // Retorna un mensaje indicando que no hay libros
        } else {
            return result; // Retorna el resultado de la consulta
        }
    } catch (err) {
        console.error('execute() error: ' + err.message);
        throw err;
    } finally {
        if (connection) {
            try {
                //await connection.close();
            } catch (err) {
                console.error('close() error: ' + err.message);
            }
        }
    }
}

// Actualizar un libro
async function UpdateLibro(libro) {
    try {
    let connection;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    connection = await oracledb.getConnection();
    
    const { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas } = libro;
    const query = `
        UPDATE LIBROS
        SET titulo = :titulo,
            editorial_id = :editorial_id,
            categoria_id = :categoria_id,
            autor_id = :autor_id,
            paginas = :paginas
        WHERE libro_id = :libro_id
    `;
    const binds = { libro_id,  editorial_id, categoria_id, autor_id,titulo, paginas };
   
        const result = await connection.execute(query, binds, { autoCommit: true });
        return result.rowsAffected;
    } catch (err) {
        console.error('Error ejecutando UpdateLibro:', err);
        throw err;
    }
}

// Eliminar un libro
async function DeleteLibro(libro_id) {
    let connection;
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    connection = await oracledb.getConnection();
    const query = 'DELETE FROM LIBROS WHERE libro_id = :libro_id';
    try {
        const result = await connection.execute(query, { libro_id }, { autoCommit: true });
        return result.rowsAffected;
        
    } catch (err) {
        console.error('Error ejecutando DeleteLibro:', err);
        throw err;
    }
}


async function NewLibro(libro) {
    let connection;

    try {
        // Obtener una conexión a la base de datos
        connection = await oracledb.getConnection();

        // Desestructurar los datos del libro
        const { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas } = libro;

        // Ejecutar la consulta SQL para insertar un nuevo libro
        const result = await connection.execute(
            `INSERT INTO LIBROS (libro_id, editorial_id, categoria_id, autor_id, titulo, paginas)
             VALUES (:libro_id, :editorial_id, :categoria_id, :autor_id, :titulo, :paginas)`,
            { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas },
            { autoCommit: true }
        );

        console.log('Resultado de la inserción:', result);

        // Devolver el número de filas afectadas
        return result.rowsAffected;
    } catch (err) {
        console.error('Error ejecutando NewLibro:', err);
        throw err;
    } finally {
        if (connection) {
            try {
                // Cerrar la conexión después de usarla
                await connection.close();
                console.log('Conexión a la base de datos cerrada');
            } catch (err) {
                console.error('Error al cerrar la conexión:', err);
            }
        }
    }
}
module.exports = {
    ShowLibros,
    UpdateLibro,
    DeleteLibro,
    NewLibro
};
