const { response } = require('express');
const bcrypt = require('bcrypt');
const express = require('express');
// const Joi = require('joi');
const Usuario = require('../models/user_model');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    /* Se busca un documento/registro y la condicion es que regrese el email del body */
    Usuario.findOne({ email: req.body.email })
        .then(datos => { 
            if(datos){
                /* Compara la contraseña de forma síncrona porque es un dato específico. */
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if(!passwordValido) return res.status(400).json({error:'ok', msj: 'Usuario o contraseña incorrecta.'})
                res.json(datos)
            }else{
                res.status(400).json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error: 'ok',
                msj: 'Error en el servicio' + err
            })
        })
});

module.exports = ruta;