// db.js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1', 
    user: 'root', 
    password: '', 
    database: 'insembd', 
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
