const express = require('express');
const Curso = require('../models/course_model');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    })
    // res.json('Listo el GET de cursos.');
});

ruta.post('/', (req, res) => {
    let resultado = crearCurso(req.body);
    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

ruta.put('/:id', (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err)
    })
});

ruta.delete('/:id', (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err);
    })
});

async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;
}

async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
    });
    return await curso.save();
}

async function actualizarCurso(id, body) {
    /* Se crea un método asíncrono porque vamos a consultar el documento en la base de datos y al mismo tiempo se va a hacer la actualización. */

    /* findOneAndUpdate : Método que selecciona un documento y lo actualiza al mismo tiempo. */
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
        /* {new: true} Nos retorne el documento que se ha actualizado. */
    }, { new: true });
    return curso;
}

/* En este caso no se recibe el Body del request ya que solamente se va a hacer una actualización del estado */
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}

module.exports = ruta;