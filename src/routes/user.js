const express = require('express');
const query=require('../query')
const router = express.Router();
const Controller = require('../controllers/customerController'); // Asegúrate de que la ruta sea correcta

router.get('/', async(req,res)=>{
const result=await query.ShowLibros();
return res.status(200).json({
    result
});
});
// Ruta para manejar la actualización del libro
router.post('/libros/actualizar', async (req, res) => {
    const { libro_id,  editorial_id, categoria_id, autor_id, titulo,paginas } = req.body;

    try {
        const result = await query.UpdateLibro({ libro_id,  editorial_id, categoria_id, autor_id,titulo, paginas });
        if (result > 0) {
            res.status(200).json({ message: 'Libro actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
});

// Ruta para manejar la eliminación del libro
router.post('/libros/eliminar', async (req, res) => {
    const { libro_id } = req.body;

    try {
        const result = await query.DeleteLibro(libro_id);
        if (result > 0) {
            res.status(200).json({ message: 'Libro eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Libro no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
});

// Ruta para agregar un libro
// Ruta para agregar un libro
router.post('/libros', async (req, res) => {
    try {
        const { libro_id, editorial_id, categoria_id, autor_id, titulo, paginas } = req.body;
        
        const result = await query.NewLibro({ libro_id, editorial_id, categoria_id, autor_id, titulo, paginas });
        const mensajeSalida='insercion realizada'
        return res.status(200).json({ mensajeSalida });
    } catch (error) {
        console.error('Error al agregar un libro:', error);
        return res.status(500).json({ message: 'Error al agregar un libro.' });
    }
});

module.exports=router;