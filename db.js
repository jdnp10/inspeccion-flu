// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1', // Corregido, las comillas son necesarias
    user: 'root', // Usuario root
    password: '', // Si no tienes contraseña, déjalo vacío pero con las comillas
    database: 'insembd', // Nombre de tu base de datos entre comillas
    port: 3306 // El puerto de MySQL que usas
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
