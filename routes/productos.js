const { Router } = require('express');
const { validarJWY, validarCampos, tieneRole } = require('../middlewares/index');
const { obtenerProductos, obtenerProducto, crearProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-validator');
const { check } = require('express-validator');



const router = Router();
/**
 * {{url}}/api/categorias
 */
//obetener todas las categorias - publico
router.get('/', obtenerProductos);

//Obtner una categoria por id - publico
router.get('/:uid',
    [
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeProducto),
        validarCampos,
    ],
    obtenerProducto
);

//Crear categoria -- caulquier persona con un token valido
router.post('/', [
    validarJWY,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),

    validarCampos
], crearProductos);

//Actulizar categoria por id - caulquiera con token valido
router.put('/:uid',
    [
        validarJWY,
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeProducto),
        // check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarProducto
);

//Borrar una categoria- solo Admin
router.delete('/:uid',

    [
        validarJWY,
        // esAdminRole,
        tieneRole('ADMIN_ROLE'),
        check('uid', 'no es un ID válido').isMongoId(),
        check('uid').custom(existeProducto),
        validarCampos
    ],
    borrarProducto
)



module.exports = router