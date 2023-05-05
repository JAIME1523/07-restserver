const dbValidator = require('./db-validator');
const generarHWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');
const categoriasValidator = require('./categorias-validator');


module.exports = {
    ...dbValidator,
    ...generarHWT,
    ...googleVerify,
    ...subirArchivo,
    ...categoriasValidator
}



