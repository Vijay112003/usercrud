// db.js
const mysql = require('mysql2');

// Create a connection pool for better performance and handling multiple connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Replace with your MySQL username
  password: '',      // Replace with your MySQL password
  database: 'crud_app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool for use in other files
module.exports = pool.promise();