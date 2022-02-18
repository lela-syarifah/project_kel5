const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(express.json());

// create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_mysql",
});

// connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("mysql wis konek broh!");
});

// tampilkan semua data product
app.get("/data/product", (req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

// tampilkan data product berdasarkan product_id
app.get("/data/product/:product_id", (req, res) => {
  let sql = "SELECT * FROM product WHERE product_id=" + req.params.product_id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

// tampilkan data product baru
app.post("/data/product", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_qty: req.body.product_qty,
  };
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

// edit data product berdasarkan product_id
app.put("/data/product/:product_id", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "', product_qty='" +
    req.body.product_qty +
    "' WHERE product_id=" +
    req.params.product_id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

// delete data product berdasarkan product_id
app.delete("/data/product/:product_id", (req, res) => {
  let sql =
    "DELETE FROM product WHERE product_id=" + req.params.product_id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

// server listening
app.listen(3000, () => {
  console.log("server berjalan di port 3000");
});
