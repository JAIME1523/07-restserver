const { Router } = require('express');
const { check } = require('express-validator');
// const bodyParser = require("body-parser");
const {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioPatch,
    usuarioDelete } = require('../controllers/usuarios');
const { esRolevalido, emailExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// const bodyPserse = require("body-parser");


const router = Router();
// const jsonParser = bodyPserse.json();

router.get('/', usuariosGet);
router.put('/:id', usuarioPut);
router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'EL password debe ser mas de 6 letras ').isLength(6),

    check('correo').custom(
        emailExiste,
    ).isEmail(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(
        esRolevalido
    ),
    validarCampos

], usuarioPost);
// router.post('/',jsonParser,  usuarioPost);


router.patch('/', usuarioPatch);
router.delete('/', usuarioDelete);

module.exports = router;