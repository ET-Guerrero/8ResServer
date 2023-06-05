const { response , request} = require('express')

const usuariosGet = (req = request, res = response) => {

  const {q, nombre, key} = req.query;

    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        key
    })
  }

const usuariosPost = (req, res = response) => {

    
    const {nombre,edad} = req.body;

    res.json({
        ok: true,
        msg: 'Post API - Controlador',
        nombre,
        edad
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



