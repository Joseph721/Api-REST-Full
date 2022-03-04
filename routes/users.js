const express = require('express');
const Usuario = require('../models/user_model');
const ruta = express.Router();

// ruta.get('/', (req, res) => {
//     res.json('Listo el GET de usuarios.');
// });

ruta.get('/', (req, res) => {
    let resultado = listarUsuariosActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err =>{
        res.status(400).json({
            error: err
        })
    });
});

ruta.post('/', (req, res) => {
    let body = req.body;
    let resultado = crearUser(body);

    resultado.then(user => {
        res.json({
            valor: user
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    });
});

ruta.put('/:email', (req, res) => {
    /* Como let "resultado" viene de una función asíncrona, entonces, nos va a devolver una promesa. */
    let resultado = actualizarUser(req.params.email, req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    });
});

ruta.delete('/:email', (req, res) => {
    let resultado = desactivarUser(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    });
});


/* Función Asíncrona que permite guardar información de un usuario  */
async function crearUser(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password
    });
    return await usuario.save();
}

async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado":true});
    return usuarios;
}

async function actualizarUser(email, body) {
    /* Se crea un método asíncrono porque vamos a consultar el documento en la base de datos y al mismo tiempo se va a hacer la actualización. */

    /* findOneAndUpdate : Método que selecciona un documento y lo actualiza al mismo tiempo. */
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            nombre: body.nombre,
            password: body.password
        }
        /* {new: true} Nos retorne el documento que se ha actualizado. */
    }, { new: true });
    return usuario;
}

/* En este caso no se recibe el Body del request ya que solamente se va a hacer una actualización del estado */
async function desactivarUser(email) {
    let usuario = await Usuario.findOneAndUpdate(email, {
        $set: {
            estado: false
        }
    }, { new: true });
    return usuario;
}

module.exports = ruta;