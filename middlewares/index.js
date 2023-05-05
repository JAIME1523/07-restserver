const validarCampos = require('../middlewares/validar-campos');
const validarJWY = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo');
module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWY,
    ...validarArchivoSubir
}