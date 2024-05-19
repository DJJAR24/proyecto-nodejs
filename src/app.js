const express = require('express');
const path = require('path');
const dbConnect = require('./database/connection');
const userRouter = require('./routes/user'); // Importa el enrutador de usuario

const app = express();

// Conectar a la base de datos
// ...

// Configuración del motor de vistas
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
dbConnect()

// Middleware para las rutas del usuario
app.use('/user', userRouter); // Usar el enrutador de usuario en la ruta '/user'
// Rutas adicionales si las hay
// ...

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Rutas de ejemplo
/*
app.get("/", function (req, res) {
    res.render("añadirEditorial");
});
*/
app.get("/agregarlibro", function (req, res) {
    res.render("agregarLibro");
    
});
app.get("/eliminarlibro", function (req, res) {
    res.render("eliminarLibro");
    
});

app.get("/actualizarLibro", function (req, res) {
    res.render("actualizarLibro");
    
});
app.post('/libros',userRouter); 

app.post('/libros/eliminar',userRouter); 
app.post('/libros/actualizar',userRouter); 

// Iniciar el servidor
app.listen(3000, function () {
    console.log("Servidor corriendo en el puerto 3000");
});


