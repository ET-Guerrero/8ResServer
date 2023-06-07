const { response , request} = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario');





const usuariosGet = (req = request, res = response) => {


  // Ejemplo: http://localhost:8080/api/usuarios?q=hola&nombre=fernando&key=3456
  const {q, nombre, key} = req.query;

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        key
    })
  }

const usuariosPost = async(req, res = response) => {

  //aqui estaba la parte que validaba datos, pero lo converti en middleware y ahora esta en routes>usuariosRoutes

    const {nombre, correo, password, rol} = req.body;

    // Creo la instancia del usuario
    const usuario = new Usuario({nombre, correo , password, rol});

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
      return res.status(400).json( {
        msg: 'El correo ya está registrado'
      })
    }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar la base de datos

    // Guardo la instancia del usuario
    await usuario.save();

    res.json({
        ok: true,
        msg: 'Post API - Controlador',
        usuario
    })
  }

const usuariosPut = (req, res = response) => {
  const {id }= req.params;
    res.json({
        ok: true,
        msg: 'Put API - Controlador',
        id
    })
  }

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch API - Controlador'
    })
  }

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete API - Controlador'
    })
  }


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}



