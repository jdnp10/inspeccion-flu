const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware para verificar que el usuario está autenticado
function checkAuth(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Ruta para mostrar el formulario de inspección
router.get('/inspeccion', checkAuth, (req, res) => {
    res.render('inspeccion', { message: '', user: req.session.usuario });
});

// Ruta para guardar la inspección
router.post('/inspeccion', checkAuth, (req, res) => {
    const { nombre_embarcacion, numero_registro, numero_patente, nombre_propietario, tipo_embarcacion, manga, eslora, puntal, calado, francobordo, potencia_motores, fecha_registro } = req.body;

    // Cédula del inspector desde la sesión
    const ccInspector = req.session.usuario.cedula;

    const query = `INSERT INTO inspecciones (nombre_embarcacion, numero_registro, numero_patente, nombre_propietario, tipo_embarcacion, manga, eslora, puntal, calado, francobordo, potencia_motores, fecha_registro, cc_inspector) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre_embarcacion, numero_registro, numero_patente, nombre_propietario, tipo_embarcacion, manga, eslora, puntal, calado, francobordo, potencia_motores, fecha_registro, ccInspector];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al guardar la inspección:', err);
            res.render('inspeccion', { message: 'Error al guardar la inspección. Inténtalo de nuevo.', user: req.session.usuario });
        } else {
            res.render('inspeccion', { message: 'Inspección guardada exitosamente.', user: req.session.usuario });
        }
    });
});

module.exports = router;
