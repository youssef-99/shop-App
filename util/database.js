const mysql = require ('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'you@ssef99'
});

module.exports = pool.promise();