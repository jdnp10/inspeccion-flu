const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const inspeccionesRoutes = require('./routes/inspecciones');

const app = express();
const db = require('./db');

// Middleware para el análisis del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de sesiones
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
}));

// Rutas públicas
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', authRoutes);
app.use('/', inspeccionesRoutes);

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index');
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
