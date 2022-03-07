const { response } = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
// const Joi = require('joi');
const Usuario = require('../models/user_model');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    /* Se busca un documento/registro y la condicion es que regrese el email del body */
    Usuario.findOne({ email: req.body.email })
        .then(datos => {
            if (datos) {
                /* Compara la contraseña de forma síncrona porque es un dato específico. */
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if (!passwordValido) return res.status(400).json({ error: 'ok', msj: 'Usuario o contraseña incorrecta.' })

                // const jwToken = jwt.sign({ _id: datos._id, nombre: datos.nombre, email: datos.email }, 'pizza');
                // res.send(jwToken);

                /* Otra forma de generar el Token*/
                const jwToken = jwt.sign({
                    data: { _id: datos._id, nombre: datos.nombre, email: datos.email }
                }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });

                res.json({
                    usuario: {
                        _id: datos._id,
                        nombre: datos.nombre,
                        email: datos.email
                    },
                    jwToken
                })
                /* Aqui devolvemos el JSON de los datos */
                // res.json(datos)
            } else {
                res.status(400).json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: 'ok',
                msj: 'Error en el servicio ' + err
            })
        })
});

module.exports = ruta;