const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));


const pool = new Pool({
    user: 'desarrolladores', 
    host: 'db',
    database: 'northwind',
    password: '12345', 
    port: 5432
});


app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
    }
});


app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el producto');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
