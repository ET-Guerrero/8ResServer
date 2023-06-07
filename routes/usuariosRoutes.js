
const {Router} = require('express');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

//obtener datos
router.get('/', usuariosGet )


  
//actualizar datos
router.put('/:id',  usuariosPut )

//Crear datos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password  debe er mas largo que 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos   
],  usuariosPost)

//Crear datos
router.patch('/',  usuariosPatch)

//Borrar datos
router.delete('/',  usuariosDelete)





module.exports = router;