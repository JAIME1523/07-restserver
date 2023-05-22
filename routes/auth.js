const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWY } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/login',
    [
        check('correo', 'el correo obligatorio').isEmail(),
        check('password', 'Contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login,
);
router.post('/google',
    [
        check('id_token', 'el id_token obligatorio').notEmpty(),
        validarCampos
    ],
    googleSingIn,
);

router.get('/', validarJWY,renovarToken)


module.exports = router;