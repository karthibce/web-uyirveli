const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


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
