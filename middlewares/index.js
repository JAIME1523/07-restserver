const validarCampos  = require('../middlewares/validar-campos');
const validarJWY =require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWY
}