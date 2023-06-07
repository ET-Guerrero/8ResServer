
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [false, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, ' La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default:false
    },
    


})
//Aqui estoy creando la clase Usuario que ademas de otros parametros y metodos, tiene el esquema que le di yo
module.exports = model('Usuario', UsuarioSchema );