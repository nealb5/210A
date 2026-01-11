const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'db',
    user: 'developer',
    password: 'password',
    database: 'lab_6',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = db;
