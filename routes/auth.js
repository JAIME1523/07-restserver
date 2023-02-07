const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/login',
    [

        check('correo', 'el correo obligatorio').isEmail(),
        check('password', 'Contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login,
);

module.exports = router;