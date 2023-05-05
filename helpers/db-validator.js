const producto = require('../models/producto');
const Rol = require('../models/role');
const Usuario = require('../models/usuario');



const esRolevalido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(` El rol ${rol}, no esta registrado en la base de datos`);
    }

}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(` El correo ${correo},ya esta registrado en la base de datos`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}
const existeUsuarioPorId = async (id) => {
    const exiateUsuario = await Usuario.findById(id);
    if (!exiateUsuario) {
        throw new Error(` El ID ${id}, no existe`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}
const existeProducto = async (id) => {
    const exiateProducto = await producto.findById(id);
    if (!exiateProducto) {
        throw new Error(` El ID ${id}, no existe`);
        // return res.status(400).json({
        //     msg: 'El correo ya esta regsitrado',

        // });

    }

}

//validar colecciones permitidas 
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(` La coleccion ${coleccion}, no es permitida -- ${colecciones}`);
    }
    return true;
}

module.exports = {
    existeProducto,
    esRolevalido,
    emailExiste,
    existeUsuarioPorId,
    coleccionesPermitidas
}