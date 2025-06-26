const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

// API Route
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM tbl_user', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Query failed' });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
