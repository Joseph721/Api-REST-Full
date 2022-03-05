const mongoose = require('mongoose');

/* Se crea una instancia de mongoose para crear un esquema. */
const courseSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        required: false
    },
    /* Para cambiar el estado de los datos sin eliminarlos.  */
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    },
    alumnos: {
        type: Number,
        default: 0
    },
    calificacion: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Curso', courseSchema);