/*const mysql = require('mysql2');

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
*/
const { Pool } = require('pg');

const db = new Pool({
  user: 'uyirveli_db_user',
  host: 'dpg-d216f12dbo4c73bp7se0-a',
  database: 'uyirveli_db',
  password: '8apJwwyGlOE7JqMt0FkozQqsNV4416wk',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ PostgreSQL connection error:', err));

module.exports = db;
