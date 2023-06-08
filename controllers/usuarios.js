const { response , request} = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario');
const Yoyos = require('../models/yoyo')





const usuariosGet = async(req = request, res = response) => {


  // Ejemplo: http://localhost:8080/api/usuarios?q=hola&nombre=fernando&key=3456
  // const {q, nombre, key} = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = {estado:true};

  // const usuarios =  await Usuario.find(query)
  // .skip(Number(desde))
  // .limit(Number( limite ));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .skip(Number(desde))
        .limit(Number( limite ))

  ])

    res.json({
      total,
      usuarios
    })
  }

const usuariosPost = async(req, res = response) => {

  //aqui estaba la parte que validaba datos, pero lo converti en middleware y ahora esta en routes>usuariosRoutes

    const {nombre, correo, password, rol} = req.body;

    // Creo la instancia del usuario
    const usuario = new Usuario({nombre, correo , password, rol});

    // Verificar si el correo existe
    // const existeEmail = await Usuario.findOne({correo});
    // if (existeEmail){
    //   return res.status(400).json( {
    //     msg: 'El correo ya está registrado'
    //   })
    // }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en la base de datos
    await usuario.save();

    //Prueba personal
    const prueba = new Yoyos({yo: nombre})
    await prueba.save()

    res.json({
        ok: true,
        msg: 'Post API - Controlador',
        usuario
    })
  }

const usuariosPut = async(req, res = response) => {
  const { id }= req.params;
  const {_id, password, google, correo, ...resto} = req.body

  //TODO validar coontra DB
  if (password){
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)

  }
  
  const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
  }

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch API - Controlador'
    })
  }

const usuariosDelete = async(req, res = response) => {

  const {id} = req.params;

  // Lo borraMOS FISICAMENTE
  //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});



    res.json({
        ok: true,
        msg: 'Delete API - Controlador',
        id,
        usuario
    })
  }


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

}



