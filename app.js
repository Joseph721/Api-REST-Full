const usuarios = require('./routes/users');
const cursos = require('./routes/courses');

const express = require('express');
const mongoose = require('mongoose');

/* Para conectarnos a la base de datos... */
mongoose.connect('mongodb://localhost/demo')
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB', err));

const app = express();

/* Se trabaja con JSON porque son los datos que vamos a intercambiar... */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users',usuarios);
app.use('/api/courses', cursos);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Api RESTFul Ok, y ejecutándose... `);
});
