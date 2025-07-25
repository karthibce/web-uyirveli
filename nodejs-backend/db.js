const mysql = require('mysql2');

// MySQL Connection
const db = mysql.createConnection({
  host: 'id-dci-web1632.main-hosting.eu', // or use Hostinger's actual host if provided (e.g., 'mysql.hostinger.in')
  user: 'u744752345_user',
  password: 'password123',
  database: 'u744752345_uyirveli',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL (Hostinger)');
});

module.exports = db;
/*
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
*/
