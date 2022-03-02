const express = require('express');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('Listo el GET de usuarios.');
});

module.exports = ruta;