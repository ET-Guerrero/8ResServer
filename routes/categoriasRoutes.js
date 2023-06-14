const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

//Obtener una categoria por id
router.get('/', obtenerCategorias)

//Obtener todas las categorias
router.get('/:id', [
    check('id', "no es id valido de mongo").isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)


//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos 
], crearCategoria)

//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria)


//Borrar una categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', "no es id valido de mongo").isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

], borrarCategoria )

module.exports = router;