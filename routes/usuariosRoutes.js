
const {Router} = require('express');
const { check } = require('express-validator');



const Role = require('../models/role');

// const {validarCampos} = require('../middlewares/validar-campos')
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRol
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();


//obtener datos
router.get('/', usuariosGet )


  
//actualizar datos
router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( rol => esRoleValido(rol)  ),
    validarCampos
],  usuariosPut )

//Crear datos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password  debe er mas largo que 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(email => emailExiste(email)),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( rol => esRoleValido(rol)  ),
    validarCampos   
],  usuariosPost)

//Crear datos
router.patch('/',  usuariosPatch)

//Borrar datos
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRol('ADMIN_ROLE', 'MAD_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],  usuariosDelete)





module.exports = router;