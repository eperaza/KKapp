const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const pool = mysql.createPool({
  host: "localhost",
  user: "phpmyadmin",
  password: "CR7realm.",
  database: "phpmyadmin",
  connectionLimit: 100,
  debug: true,
  multipleStatements: true
});

app.post('/cuponesCargar', function(req, res) { 
  
  pool.getConnection(function(err, connection) {
    connection.query( 'SELECT * FROM cupones', function(err, rows) {
      if (err) {
        console.log(err);
      }
      else if (rows.length > 0) {
        res.json(rows);
        console.log(rows);
      }
        connection.release();
    });
  });
});

app.post('/cuponesAgregar', function(req, res) { 
  pool.getConnection(function(err, connection) {
    connection.query( 'INSERT INTO cupones (serie, estatus, establecimiento, vigencia, producto) VALUES ("'+req.body.serie+'", "'+req.body.estatus+'", "'+req.body.establecimiento+'", "'+req.body.vigencia+'", "'+req.body.producto+'");', function(err, rows) {
      if (err) {
        console.log(err);
      }
      else {
        res.end('agregado');
      }
        connection.release();
    });
  });
});

app.post('/cuponesBorrar', function(req, res) { 
  pool.getConnection(function(err, connection) {
    connection.query( 'DELETE FROM cupones WHERE id='+req.body.id+'', function(err, rows) {
      if (err) {
        console.log(err);
      }
      else {
        res.end('borrado');
      }
        connection.release();
    });
  });
});

app.post('/cuponesEditar', function(req, res) { 
  console.log('la serie es: '+req.body.serie);
  pool.getConnection(function(err, connection) {
    connection.query( 'UPDATE cupones SET serie = "'+req.body.serie+'", estatus = "'+req.body.estatus+'", establecimiento = "'+req.body.establecimiento+'", producto = "'+req.body.producto+'" WHERE id='+req.body.id+'', function(err, rows) {
      if (err) {
        console.log(err);
      }
      else {
        res.end('editado');
      }
        connection.release();
    });
  });
});

app.post('/cuponesValidar', function(req, res) { 
  if(req.body.id){
  pool.getConnection(function(err, connection) {
      connection.query( 'SELECT * FROM cupones WHERE id='+req.body.id+'', function(err, rows) {
      if (err) {
        res.send(200);
      }
      else if (rows[0]) { 
        res.json(rows);
      }
      else {
        res.send(200);
      }
      connection.release();

    });
  });
  }
});

app.post('/cuponesCanjear', function(req, res) { 
  pool.getConnection(function(err, connection) {
    connection.query( 'UPDATE cupones SET estatus = "CANJEADO", intentos=intentos+1 WHERE id='+req.body.id+'', function(err, rows) {
      if (err) {
        res.send(200);
      }
      else if (rows[0]) { 
        res.json(rows);
      }
      else {
        res.send(200);
      }
        connection.release();
    });
  });
});


app.listen(3001, function() {
console.log("App Started on PORT 3001");
});