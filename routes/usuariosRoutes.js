
const {Router} = require('express');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

//obtener datos
router.get('/', usuariosGet )


  
//actualizar datos
router.put('/:id',  usuariosPut )

//Crear datos
router.post('/',  usuariosPost)

//Crear datos
router.patch('/',  usuariosPatch)

//Borrar datos
router.delete('/',  usuariosDelete)





module.exports = router;