const mysql = require("mysql2/promise");

const connection = mysql
  .createConnection({
    host: 'localhost',
    user: 'root',
    password: '7@gma6#U^uB3dHNr',
    database: 'employees_db'  })

module.exports = connection;