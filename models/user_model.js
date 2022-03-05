const mongoose = require('mongoose');

/* Se crea una instancia de mongoose para crear un esquema. */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /* Para cambiar el estado de los datos sin eliminarlos.  */
    estado: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Usuario', userSchema);

/* Se crea un modelo de datos.*/

