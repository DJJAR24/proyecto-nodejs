import oracledb from 'oracledb';
//import { config } from "./src/config.js"; 
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_11_2' });

async function run() {
    let con;

    try {
        con = await oracledb.getConnection({
            user: "db_proyecto_final",
            password: "its",
            connectString:"127.0.0.1:1521/XE"
        });
        console.log('Conexión exitosa');
        const data = await con.execute(
            `INSERT INTO libro (libro_id, titulo, autor, publicacion, editorial) VALUES (:1, :2, :3, :4, :5)`,
            [1, 'El principito', 'Antoine de Saint-Exupéry', new Date('1943-04-06'), 'Reynal & Hitchcock']
        );
        const data1 = await con.execute(
            'select * from libro'
        );
        console.log(data.rows);
        console.log(data1.rows);
    } catch (err) {
        console.log(err);
    } finally {
        // Cerrar la conexión
        if (con) {
            try {
                await con.close();
                console.log("Conexión cerrada correctamente.");
            } catch (error) {
                console.error("Error al cerrar la conexión:", error);
            }
        }
    }
}

run();