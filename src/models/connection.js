const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'Users_CRUD',
  password: 'admin',
  port: 3306, // This field is not required if the port is set to 3306
});

module.exports = connection;