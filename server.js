const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// Endpoint 
app.get('/products', (req, res) => {
  const limit = req.query.limit; // Obtener el valor query

  // Lproductos
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al leer los productos' });
    }

    let productos = JSON.parse(data);

    // limite
    if (limit) {
      productos = productos.slice(0, limit);
    }

    res.json(productos);
  });
});

// Endpoint y id
app.get('/products/:id', (req, res) => {
  const id = req.params.id; 

  // L
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al leer los productos' });
    }

    let productos = JSON.parse(data);

    // search id
    const producto = productos.find((p) => p.id === parseInt(id));

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  });
});

// init server
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});