const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


// API Route
// ✅ POST login route
app.post('/api/login', (req, res) => {
  const { uname, psw } = req.body;

  if (!uname || !psw) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const query = 'SELECT * FROM tbl_users WHERE USR_Username = ? AND USR_PasswordHash = ?';
  db.query(query, [uname, psw], (err, results) => {
    if (err) {
      console.error('Login query failed:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    if (results.length > 0) {
      // You could also generate a token here
      res.json({ success: true, message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  });
});

// ===================== Customers Services =====================

// Get all customers
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM tbl_customer_info WHERE CUS_Status != "Deleted"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Create new customer
app.post('/customers', (req, res) => {
  const { CUS_CustomerName, CUS_PhoneNumber, CUS_Village, CUS_Block, CUS_District, CUS_CreatedBy } = req.body;
  const sql = `INSERT INTO tbl_customer_info
    (CUS_CustomerName, CUS_PhoneNumber, CUS_Village, CUS_Block, CUS_District, CUS_CreatedBy)
    VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [CUS_CustomerName, CUS_PhoneNumber, CUS_Village, CUS_Block, CUS_District, CUS_CreatedBy];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, message: 'Customer created successfully' });
  });
});

// Soft delete customer
app.delete('/customers/:id', (req, res) => {
  const id = req.params.id;
  const { CUS_LastModifiedBy } = req.body;

  const sql = `UPDATE tbl_customer_info SET CUS_Status = 'Deleted', CUS_LastModifiedBy = ? WHERE CUS_CustomerID = ?`;

  db.query(sql, [CUS_LastModifiedBy, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted successfully (soft delete)' });
  });
});

// Update customer
app.put('/customers/:id', (req, res) => {
  const id = req.params.id;
  const { CUS_CustomerName, CUS_PhoneNumber, CUS_Village, CUS_Block, CUS_District, CUS_LastModifiedBy, CUS_Status } = req.body;

  const sql = `UPDATE tbl_customer_info SET
    CUS_CustomerName = ?,
    CUS_PhoneNumber = ?,
    CUS_Village = ?,
    CUS_Block = ?,
    CUS_District = ?,
    CUS_LastModifiedBy = ?,
    CUS_Status = ?
    WHERE CUS_CustomerID = ?`;

  const values = [CUS_CustomerName, CUS_PhoneNumber, CUS_Village, CUS_Block, CUS_District, CUS_LastModifiedBy, CUS_Status, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Customer not found' });
    res.json({ message: 'Customer updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});


// ===================== Order Items (Separate Service) =====================
// Get all customers
app.get('/order-items', (req, res) => {
  db.query('SELECT * FROM tbl_order_items WHERE OIT_Status != "Deleted"', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add Item to Existing Order
app.post('/order-items', (req, res) => {
  const item = req.body;
  const sql = `INSERT INTO tbl_order_items (OIT_ORD_OrderID, OIT_PRD_ProductID, OIT_Quantity, OIT_Price, OIT_ItemAmount, OIT_Discount, OIT_TotalAmount, OIT_Status, OIT_CreatedBy)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    item.OIT_ORD_OrderID,
    item.OIT_PRD_ProductID,
    item.OIT_Quantity,
    item.OIT_Price,
    item.OIT_ItemAmount,
    item.OIT_Discount,
    item.OIT_TotalAmount,
    item.OIT_Status || 'Active',
    item.OIT_CreatedBy
  ];
  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'Item added to order', itemId: result.insertId });
  });
});

// Update an Order Item
app.put('/order-items/:id', (req, res) => {
  const id = req.params.id;
  const item = req.body;
  const sql = `UPDATE tbl_order_items SET
    OIT_Quantity = ?, OIT_Price = ?, OIT_ItemAmount = ?, OIT_Discount = ?, OIT_TotalAmount = ?, OIT_Status = ?, OIT_LastModifiedBy = ?
    WHERE OIT_OrderItemID = ?`;
  const values = [
    item.OIT_Quantity,
    item.OIT_Price,
    item.OIT_ItemAmount,
    item.OIT_Discount,
    item.OIT_TotalAmount,
    item.OIT_Status,
    item.OIT_LastModifiedBy,
    id
  ];
  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Order item updated successfully' });
  });
});

// Delete an Order Item
app.delete('/order-items/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM tbl_order_items WHERE OIT_OrderItemID = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Order item deleted successfully' });
  });
});

// List Items for an Order
app.get('/order-items/order/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  db.query('SELECT * FROM tbl_order_items WHERE OIT_ORD_OrderID = ?', [orderId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
