
const {Usuario, Categoria, Role} = require('../models');

const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({rol});

    if ( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }

}

const emailExiste = async(email = '') => {
    const existeEmail = await Usuario.findOne({correo: email});


    if (existeEmail){
        throw new Error(`El email ${email} ya esta registrado`)
    }

}

const existeUsuarioPorId = async(id ) => {
    const existeUsuario = await Usuario.findById(id);


    if (!existeUsuario){
        throw new Error(`El id ${id} no existe`)
    }

}
const existeCategoriaPorId = async( id ) => {
    const existeCategoria = await Categoria.findById(id);


    if (!existeCategoria){
        throw new Error(`El id ${id} no existe, es decir categoria`)
    }

} 



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}