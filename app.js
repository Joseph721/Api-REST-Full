const usuarios = require('./routes/users');
const cursos = require('./routes/courses');
const auth = require('./routes/auth');
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

/* Ruta que nos servirá para la autenticación de los usuarios. */
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Api RESTFul Ok, y ejecutándose... `);
});
