const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para mostrar la página de registro
router.get('/registro', (req, res) => {
    res.render('registro'); // Renderiza la vista de registro
});

// Ruta para manejar el registro de usuarios
router.post('/registro', async (req, res) => {
    const { nombre, apellido, cedula, correo, cargo, password } = req.body;

    // Verificar que todos los campos estén completos
    if (!nombre || !apellido || !cedula || !correo || !cargo || !password) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    try {
        // Insertar el nuevo usuario en la base de datos
        db.query('INSERT INTO usuarios (nombre, apellido, cedula, correo, cargo, password) VALUES (?, ?, ?, ?, ?, ?)', 
        [nombre, apellido, cedula, correo, cargo, password], (err, results) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).send('Error al registrar el usuario');
            }

            res.send('Registro exitoso, espere validación');
        });
    } catch (error) {
        console.error('Error en el proceso de registro:', error);
        return res.status(500).send('Error en el servidor');
    }
});

// Ruta para mostrar la página de login
router.get('/login', (req, res) => {
    res.render('login'); // Renderiza la vista de login
});

// Ruta para manejar el login de usuarios
router.post('/login', async (req, res) => {
    const { usuario, contraseña } = req.body;

    // Verificar que los campos no estén vacíos
    if (!usuario || !contraseña) {
        return res.status(400).send('Usuario y contraseña son obligatorios');
    }

    // Buscar al usuario por su cédula en la base de datos
    db.query('SELECT * FROM usuarios WHERE cedula = ?', [usuario], (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuario no registrado');
        }

        const user = results[0];

        // Comparar la contraseña ingresada con la de la base de datos
        if (contraseña === user.password) {
            req.session.usuario = user; // Guardar el usuario en la sesión
            return res.redirect('/inspeccion'); // Redirigir a la página de inspección
        } else {
            return res.status(401).send('Contraseña incorrecta');
        }
    });
});

// Cerrar sesión
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login'); // Redirigir al login después de cerrar sesión
});

module.exports = router;
