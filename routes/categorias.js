const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategroia } = require('../helpers/categorias-validator');
const { validarJWY, validarCampos, tieneRole } = require('../middlewares/index');

const router = Router();
/**
 * {{url}}/api/categorias
 */
//obetener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtner una categoria por id - publico
router.get('/:uid',
    [
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeCategroia),
        validarCampos,
    ],
    obtenerCategoria
);

//Crear categoria -- caulquier persona con un token valido
router.post('/', [
    validarJWY,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actulizar categoria por id - caulquiera con token valido
router.put('/:uid',
    [
        validarJWY,
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeCategroia),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);

//Borrar una categoria- solo Admin
router.delete('/:uid',

    [
        validarJWY,
        // esAdminRole,
        tieneRole('ADMIN_ROLE'),
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeCategroia),
        validarCampos
    ],
    borrarCategoria
)



module.exports = router