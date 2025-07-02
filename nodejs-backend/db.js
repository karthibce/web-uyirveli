const mysql = require('mysql2');

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',      // update with your MySQL password
  database: 'uyirveli_db'  // update with your DB name
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;
