const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_11_2' });

async function run() {
    let con;

    try {
        con = await oracledb.getConnection({
            user: "hr",
            password: "hr",
            connectString: "127.0.0.1:1521/XE"
        });
        console.log('Conexión exitosa');
        const data = await con.execute(
            "SELECT * FROM departments"
        );
        console.log(data.rows);
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